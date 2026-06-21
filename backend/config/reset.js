import { pool } from './database.js';
import 'dotenv/config';

const resetDatabase = async () => {
  try {
    console.log('🔄 Connecting to Render PostgreSQL...');

    // Test connection
    await pool.query('SELECT NOW()');
    console.log('✅ Successfully connected to Render database');

    console.log('🗑️  Dropping existing tables...');
    await pool.query(`DROP TABLE IF EXISTS events CASCADE;`);
    await pool.query(`DROP TABLE IF EXISTS locations CASCADE;`);

    console.log('📦 Creating tables...');

    // Create locations table with image_url
    await pool.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL,
        description TEXT,
        sport_focus VARCHAR(50),
        image_url TEXT
      );
    `);

    // Create events table
    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_date TIMESTAMP NOT NULL,
        location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
        sport VARCHAR(50) NOT NULL,
        category VARCHAR(50),
        price VARCHAR(20) DEFAULT 'Free',
        image_url TEXT
      );
    `);

    console.log('📍 Seeding locations with cover images...');

    const locationsResult = await pool.query(`
      INSERT INTO locations (name, description, sport_focus, image_url) VALUES
      ('Central Park Soccer Field', 
       'The heart of weekend soccer. Great grass, friendly crowd, and always free to watch.', 
       'Soccer',
       'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800'),
      
      ('Riverside Basketball Courts', 
       'Outdoor courts with lights. Home of the best pickup games and 3v3 tournaments in town.', 
       'Basketball',
       'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800'),
      
      ('Oakwood Baseball Diamond', 
       'Classic neighborhood field. Little League games, adult softball, and weekend pick-up.', 
       'Baseball',
       'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800'),
      
      ('Willow Creek Multi-Sport Park', 
       'Track, volleyball, ultimate frisbee and community fitness events. Something for everyone.', 
       'Multi-Sport',
       'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=800')
      RETURNING id, name;
    `);

    // Map location names to IDs
    const locationMap = {};
    locationsResult.rows.forEach(row => {
      locationMap[row.name] = row.id;
    });

    console.log('🎯 Seeding 14 events...');

    await pool.query(`
      INSERT INTO events (title, description, event_date, location_id, sport, category, price, image_url) VALUES
      -- === SOCCER ===
      ('High School Varsity Soccer: Lincoln High vs Riverside Prep', 
       'Big cross-town rivalry match. Come support the Lincoln Lions in this exciting local derby.', 
       '2026-06-28 16:00:00', $1, 'Soccer', 'High School', 'Free', 'https://images.unsplash.com/photo-1574629810360-7efbb19255cb?w=800'),

      ('College Club Soccer: State University vs Metro College', 
       'High-level club soccer between two strong local college teams.', 
       '2026-07-05 18:30:00', $1, 'Soccer', 'College', 'Free', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce8ba9?w=800'),

      ('U14 Youth Soccer League Semifinals', 
       'Local youth teams battle for a spot in the finals. Family-friendly atmosphere.', 
       '2026-06-27 10:00:00', $1, 'Soccer', 'Youth (U14)', 'Free', 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800'),

      -- === BASKETBALL ===
      ('High School Boys Basketball Summer League Showcase', 
       'Top high school players compete. College scouts often attend this event.', 
       '2026-06-29 17:00:00', $2, 'Basketball', 'High School', 'Free', 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800'),

      ('College Intramural 3v3 Basketball Tournament', 
       'Open to all college students. Competitive but fun environment.', 
       '2026-07-02 19:00:00', $2, 'Basketball', 'College', '$', 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=800'),

      ('Adult Pickup Basketball – All Levels Welcome', 
       'Casual evening games with mixed ages and skill levels.', 
       '2026-07-01 18:00:00', $2, 'Basketball', 'Adult (18+)', 'Free', 'https://images.unsplash.com/photo-1574624644851-bc015dece1d8?w=800'),

      -- === BASEBALL ===
      ('High School Baseball Regional Playoff Game', 
       'Winner advances to the state tournament. Strong pitching matchup expected.', 
       '2026-06-30 16:30:00', $3, 'Baseball', 'High School', 'Free', 'https://images.unsplash.com/photo-1508344928928-7137b29de2f6?w=800'),

      ('College Club Baseball vs Alumni All-Stars', 
       'Popular annual game between current players and former graduates.', 
       '2026-07-04 14:00:00', $3, 'Baseball', 'College', 'Free', 'https://images.unsplash.com/photo-1498309313100-e308c0945b89?w=800'),

      ('Little League All-Star Game (Ages 11-12)', 
       'Best young local players come together for this exciting showcase.', 
       '2026-06-26 17:00:00', $3, 'Baseball', 'Youth (11-12)', 'Free', 'https://images.unsplash.com/photo-1590502593747-42a996111139?w=800'),

      -- === MULTI-SPORT ===
      ('High School Track & Field District Championship', 
       'Top athletes from across the district compete in sprints and field events.', 
       '2026-07-03 09:00:00', $4, 'Track & Field', 'High School', 'Free', 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800'),

      ('College Club Ultimate Frisbee Tournament', 
       'Fast-growing sport with high energy and great sportsmanship.', 
       '2026-07-06 11:00:00', $4, 'Ultimate Frisbee', 'College', 'Free', 'https://images.unsplash.com/photo-1559868779-7a3d1b8004b3?w=800'),

      ('Community Coed Volleyball League – Week 5', 
       'Recreational league for adults. All skill levels are welcome.', 
       '2026-07-02 18:30:00', $4, 'Volleyball', 'Adult (18+)', '$', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800'),

      -- === PAST EVENTS (for testing) ===
      ('Spring High School Soccer Invitational – Final', 
       'One of the biggest high school soccer events of the spring season.', 
       '2026-05-18 15:00:00', $1, 'Soccer', 'High School', 'Free', 'https://images.unsplash.com/photo-1518605368461-1e1e38ce8ba9?w=800'),

      ('College Club Basketball Charity Classic', 
       'Annual charity game supporting local youth sports programs.', 
       '2026-05-30 18:00:00', $2, 'Basketball', 'College', 'Free', 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800')
    `, [
      locationMap['Central Park Soccer Field'],
      locationMap['Riverside Basketball Courts'],
      locationMap['Oakwood Baseball Diamond'],
      locationMap['Willow Creek Multi-Sport Park']
    ]);

    console.log('✅ Database reset completed successfully!');
    console.log('   → 4 locations with cover images');
    console.log('   → 14 events (High School, College, Youth & Adult)');

  } catch (error) {
    console.error('❌ Error resetting database:', error.message);
  } finally {
    await pool.end();
  }
};

resetDatabase();