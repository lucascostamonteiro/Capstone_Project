from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password', host=True)
    marnie = User(username='marnie', email='marnie@aa.io', password='password', host=True)
    bobbie = User(username='bobbie', email='bobbie@aa.io', password='password', host=True)
    kian = User(username='kian', email='kian@aa.io', password='password', host=True)
    selena = User(username='selena', email='selena@aa.io', password='password', host=True)

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(kian)
    db.session.add(selena)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
