# from app.models import db, Image

# def seed_images():
#     image1 = Image(
#         listing_id=1,
#         url='https://a0.muscache.com/im/pictures/265abca4-c237-4510-853b-1e4d6ea8d747.jpg?im_w=1200'
#     )
#     image2 = Image(
#         listing_id=2,
#         url='https://a0.muscache.com/im/pictures/b6b67d91-663b-4a69-9a7a-836d0313ac41.jpg?im_w=960'
#     )
#     image3 = Image(
#         listing_id=3,
#         url='https://a0.muscache.com/im/pictures/4d653506-8112-4193-9dd4-69e1a108c74a.jpg?im_w=1200'
#     )
#     image4 = Image(
#         listing_id=4,
#         url='https://a0.muscache.com/im/pictures/31cd5e44-ed17-49fd-9650-9c7e53a6a547.jpg?im_w=960'
#     )
#     image5 = Image(
#         listing_id=5,
#         url='https://a0.muscache.com/im/pictures/55b21f0c-4a43-49f3-9bc5-daac0149ac3b.jpg?im_w=960'
#     )
#     image6 = Image(
#         listing_id=6,
#         url='https://a0.muscache.com/im/pictures/55f4ebfa-98d3-4582-ad01-e0f37e74524b.jpg?im_w=1200'
#     )

#     db.session.add(image1)
#     db.session.add(image2)
#     db.session.add(image3)
#     db.session.add(image4)
#     db.session.add(image5)
#     db.session.add(image6)

#     db.session.commit()


# def undo_images():
#     db.session.execute('TRUNCATE images RESTART IDENTITY CASCADE;')
#     db.session.commit()
