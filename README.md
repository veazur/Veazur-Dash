# Veazur-Client
[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fveazur%2FVeazur-Dash&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=veiws&edge_flat=false)](https://hits.seeyoufarm.com)
<a  href="https://github.com/veazur/Veazur-Dash/stargazers"><img src="https://img.shields.io/github/stars/veazur/Veazur-Dash?label=%E2%AD%90" height="20"/></a>


Another client for pterodactyl (and maybe skyport/airlink)

> this is not done there is still no server creation or a main page so do not expect this to be any good

## Installation
Installing this is very simple you just need nodejs

```
git clone https://github.com/veazur/Veazur-Dash.git
cd Veazur-Dash
npm i
npm start
```

If you want to create a user without registering on the site you can use the built in register command

```
npm run createuser
```

## Configuring

In the .env file replace both the API token and panel link to your pterodactyl api token that have all access and your pterodactyl panel link. Currently you cant add eggs or nests because I havent even made the main dashboard for it but there will be a way of adding it later on the line.

`PANEL_LINK` This is your pterodactyl panel link please include https:// but no / at he end.

`PTERO` This is your pterodactyl panel API key/token it should always start with ptla.

`SESSION_SECRET` You can leave it as it is or you can configure it for a more secure secret key.
