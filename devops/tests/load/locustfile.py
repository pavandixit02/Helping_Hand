from locust import HttpUser, task, between

class HelpingHandUser(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        """Set up the load test user (e.g., login)."""
        pass
        # self.client.post("/api/v1/auth/login/", json={"email": "test@example.com", "password": "password"})

    @task(3)
    def view_dashboard(self):
        self.client.get("/")

    @task(2)
    def list_appointments(self):
        self.client.get("/api/v1/appointments/")

    @task(1)
    def view_services(self):
        self.client.get("/api/v1/services/")
