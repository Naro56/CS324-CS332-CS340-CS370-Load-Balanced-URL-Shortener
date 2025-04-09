# CS324-CS332-CS340-CS370-Load-Balanced-URL-Shortener



✅ Step 1: Start Docker Desktop
Open Docker Desktop and let it initialize.

This starts the Docker-backed Kubernetes cluster (docker-desktop).

✅ Step 2: Check if Kubernetes is Running
Run this:


kubectl config current-context
It should return:

Copy
Edit
docker-desktop
Then:

bash
Copy
Edit
kubectl get pods
If you see pods like:


url-shortener-xxx   Running
redis-xxx           Running
You're good! Your deployments auto-restart with Docker Desktop.

⚠️ If Pods Are Missing (nothing running):
Sometimes docker-desktop resets the cluster. You can reapply your manifests:

🔁 Step 3: Redeploy Manifests
If you have YAMLs like:

redis-deployment.yaml

redis-service.yaml

url-shortener-deployment.yaml

url-shortener-service.yaml

Then just run:


kubectl apply -f .
If you don't have separate files, you can apply one combined manifest or re-run the deployment commands you used earlier.

✅ Step 4: Port Forward Again
If you're exposing your app via port-forwarding, run:


kubectl port-forward service/url-shortener-service 3000:80
Then open http://localhost:3000 in your browser.

✅ Summary
Action	What to Do
Shutdown PC	Safe — deployments will restart if Docker Desktop restores state
After Restart	Open Docker Desktop
Check if running	kubectl get pods
Reapply if missing	kubectl apply -f . (your YAML files)
Access app again	kubectl port-forward service/url-shortener-service 3000:80
Let me know if you'd like a restart.sh helper script or want help converting your YAMLs into a Helm chart for easier reuse.
