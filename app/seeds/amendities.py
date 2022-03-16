from app.models import db, Amendity

def seed_amends():
    amends_1 = Amendity(
        listing_id=1,
        free_parking=True,
        wifi=True,
        air_conditioning=True,
        pool=True,
    )
    amends_2 = Amendity(
        listing_id=2,
        free_parking=True,
        wifi=True,
        air_conditioning=True,
        pool=True,
    )
    amends_3 = Amendity(
        listing_id=3,
        free_parking=True,
        wifi=True,
        air_conditioning=True,
        pool=True,
    )
    amends_4 = Amendity(
        listing_id=4,
        free_parking=True,
        wifi=True,
        air_conditioning=True,
        pool=True,
    )
    amends_5 = Amendity(
        listing_id=5,
        free_parking=True,
        wifi=True,
        air_conditioning=True,
        pool=True,
    )
    amends_6 = Amendity(
        listing_id=6,
        free_parking=True,
        wifi=True,
        air_conditioning=True,
        pool=True,
    )

    db.session.add(amends_1)
    db.session.add(amends_2)
    db.session.add(amends_3)
    db.session.add(amends_4)
    db.session.add(amends_5)
    db.session.add(amends_6)

    db.session.commit()


def undo_amends():
    db.session.execute('TRUNCATE amendities RESTART IDENTITY CASCADE;')
    db.session.commit()
