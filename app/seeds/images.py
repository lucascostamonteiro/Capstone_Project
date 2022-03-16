from app.models import db, Image

def seed_images():
    image1 = Image(
        listing_id=1,
        image=''
    )
    image2 = Image(
        listing_id=2,
        image=''
    )
    image3 = Image(
        listing_id=3,
        image=''
    )
    image4 = Image(
        listing_id=1,
        image=''
    )
    image5 = Image(
        listing_id=2,
        image=''
    )
    image6 = Image(
        listing_id=3,
        image=''
    )

    db.session.add(image1)
    db.session.add(image2)
    db.session.add(image3)
    db.session.add(image4)
    db.session.add(image5)
    db.session.add(image6)

    db.session.commit()


def undo_images():
    db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
    db.session.commit()
