from turtle import title
from app.models import db, Listing

def seed_listings():
  listing_1 = Listing(
      user_id=1,
      title="Loft by the Sea/sea view",
      description= "Studio decorated signed by interior design, all in the industrial loft style where the balcony was used to make room for the table with a bed overlooking the sea. Integrated space designed for the well-being and moments of relaxation of the tenant. Ideal for a couple or who has another child . We have a sofa bed . The apartment is fully equipped and the building offers a super infrastructure with a swimming pool ",
      price= 49,
      guest = 3,
      bedroom= 1,
      bathroom = 2,
      address="Estrada da Rainha, 1009 ",
      city="Balneario Camboriu",
      state="Santa Catarina",
  )
  listing_2 = Listing(
      user_id=1,
      title="Casa das Apsaras - Spacious and Near the Square",
      description= "The house is located within a condominium (Altos de Trancoso), close to the beach and the Square, as is known the historic square of Trancoso (both are less than a 15-minute walk away). The condo has 24-hour security.",
      price= 495,
      guest = 16,
      bedroom= 9,
      bathroom = 7.5,
      address="Vila Galicia, 946",
      city="Trancoso",
      state="Bahia",
    )
  listing_3 = Listing(
      user_id=1,
      title="Charming house between river and sea",
      description= "Caraiva provides an experience of peace and quiet. The house has a privileged location, close to the river and Caraiva beach. The balcony is the luxury of the house, it has a beautiful look and on full moon nights, the show is on nature. Waking up to the singing of birds and sleeping with the sound of the sea makes your days in paradise even happier.",
      price= 51,
      guest = 4,
      bedroom= 2,
      bathroom = 1,
      address="Rua Heroina Maria Quiteria 1494",
      city="Caraiva",
      state="Bahia",
    )
  listing_4 = Listing(
      user_id=1,
      title="Casa Cosenza - Milagres",
      description= """House in a closed condominium with 3 bedrooms, two suites on the upper floor and a bedroom and a social bathroom on the ground floor, with living room, kitchen and balcony in an open and interconnected environment.
      In the common area of the condominium we have a swimming pool with gazebos, barbecue, hammocks and gym.
      The house is 900 meters from the beach, in a 10 minute walk or 2 minutes by car.
      There are shops and restaurants nearby, and the location is central on the ecological route of the Miracles.""",
      price= 150,
      guest = 8,
      bedroom= 5,
      bathroom = 3,
      address="Rua Arco Iris 254",
      city="Sao Miguel dos Milagres",
      state="Alagoas",
    )
  listing_5 = Listing(
      user_id=1,
      title="Vila Majica",
      description= """Beautifully located in front of the dunes of Jericoacoara National Park
      Designed to be fully integrated into the beautiful natural surroundings. This house perfectly combines luxury amenities and the finest natural materials.
      Stones, wood, straw, coconut trees and green plants are associated with large sofas, a kitchen, lovely terraces around a jade-colored pool.""",
      price= 150,
      guest = 6,
      bedroom= 4,
      bathroom = 2.5,
      address="Rua Silva Jardim 1896",
      city="Jericoacoara",
      state="Ceara",
    )
  listing_6 = Listing(
      user_id=1,
      title="Casa ponta dos cocoqueiros",
      description= "Shipyard beach house on Interbeaches with the best view of the region! Large room with tasted bathroom all rooms with balcony, sea view, heated pool, parking and garden. Access near Balneario Camboriu and itapema!",
      price= 135,
      guest = 8,
      bedroom= 4,
      bathroom = 4.5,
      address="Rua Nove de Julho 1277",
      city="Itapema",
      state="Santa Catarina",
    )

  db.session.add(listing_1)
  db.session.add(listing_2)
  db.session.add(listing_3)
  db.session.add(listing_4)
  db.session.add(listing_5)
  db.session.add(listing_6)

  db.session.commit()


def undo_listings():
    db.session.execute('TRUNCATE listings RESTART IDENTITY CASCADE;')
    db.session.commit()
