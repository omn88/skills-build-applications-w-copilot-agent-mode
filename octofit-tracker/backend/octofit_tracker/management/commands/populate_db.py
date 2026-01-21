from django.core.management.base import BaseCommand
from django.conf import settings
from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('mongodb://localhost:27017')
        db = client['octofit_db']

        # Usuń istniejące dane
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Unikalny indeks na email
        db.users.create_index('email', unique=True)

        # Dane przykładowe
        users = [
            {"name": "Bruce Wayne", "email": "batman@dc.com", "team": "dc"},
            {"name": "Clark Kent", "email": "superman@dc.com", "team": "dc"},
            {"name": "Diana Prince", "email": "wonderwoman@dc.com", "team": "dc"},
            {"name": "Tony Stark", "email": "ironman@marvel.com", "team": "marvel"},
            {"name": "Steve Rogers", "email": "captain@marvel.com", "team": "marvel"},
            {"name": "Natasha Romanoff", "email": "blackwidow@marvel.com", "team": "marvel"},
        ]
        teams = [
            {"name": "marvel", "members": ["Tony Stark", "Steve Rogers", "Natasha Romanoff"]},
            {"name": "dc", "members": ["Bruce Wayne", "Clark Kent", "Diana Prince"]},
        ]
        activities = [
            {"user": "Bruce Wayne", "activity": "Running", "duration": 30},
            {"user": "Tony Stark", "activity": "Cycling", "duration": 45},
        ]
        leaderboard = [
            {"team": "marvel", "points": 120},
            {"team": "dc", "points": 110},
        ]
        workouts = [
            {"name": "Pushups", "difficulty": "medium"},
            {"name": "Squats", "difficulty": "easy"},
        ]

        db.users.insert_many(users)
        db.teams.insert_many(teams)
        db.activities.insert_many(activities)
        db.leaderboard.insert_many(leaderboard)
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
