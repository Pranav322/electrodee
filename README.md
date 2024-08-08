# sih-front

Make sure docker engine is running and assigned ports are available. 
In the `app.js` and other files, edit the file locations as needed.

Install requirements.txt
`npm i requirements.txt`

Run the main file on local port of your ip
`node app.js`

Set up docker compose for Prometheus client
`docker compose up`

Run grafana on port 3000
`docker run -d -p 3000:3000 --name=grafana grafana/grafana-oss`
