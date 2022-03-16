from app.models import db, Review


def seed_reviews():
    review1 = Review(
        user_id=2,
        listing_id=1,
        content='',
        rating=5,
    )

    review2 = Review(
        user_id=2,
        listing_id=1,
        content='',
        rating=5,
    )

    review3 = Review(
        user_id=2,
        listing_id=1,
        content='',
        rating=5,
    )

    review4 = Review(
        user_id=2,
        listing_id=1,
        content='',
        rating=5,
    )



    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
