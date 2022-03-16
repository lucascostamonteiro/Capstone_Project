from flask.cli import AppGroup
from .users import seed_users, undo_users
from .amendities import seed_amends, undo_amends
from .images import seed_images, undo_images
from .listings import seed_listings, undo_listings
from .reviews import seed_reviews, undo_reviews

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Add seed functions here
    seed_users()
    seed_listings()
    seed_amends()
    seed_images()
    seed_reviews()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add undo functions here
    undo_users()
    undo_listings()
    undo_amends()
    undo_images()
    undo_reviews()
