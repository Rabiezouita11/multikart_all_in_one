Local Development Setup
1. Install Dependencies
Make sure you have Node.js installed. If not, download and install it from Node.js.

Install http-server and json-server globally using npm:

bash
Copy code
npm install -g http-server json-server
2. Run HTTP Server
Open a terminal and navigate to your project directory.

Run the following command to start an HTTP server:

bash
Copy code
http-server -c-1
This will serve your static files. Open your browser and navigate to http://localhost:8080 to view your site.

3. Run JSON Server for Panier JSON
Open a new terminal tab.

Navigate to the directory containing your panier.json file.

Run the following command to start a JSON server:

bash
Copy code
json-server --watch panier.json
Your Panier JSON data will be available at http://localhost:3000.

4. Run JSON Server for Demande JSON
Open another terminal tab.

Navigate to the directory containing your Demande.json file.

Run the following command to start a JSON server on port 4000:

bash
Copy code
json-server --watch Demande.json --port 4000
Your Demande JSON data will be available at http://localhost:4000.

5. Run JSON Server for Products JSON
Open one more terminal tab.

Navigate to the directory containing your Products.json file.

Run the following command to start a JSON server on port 5000:

bash
Copy code
json-server --watch Products.json --port 5000
Your Products JSON data will be available at http://localhost:5000.
