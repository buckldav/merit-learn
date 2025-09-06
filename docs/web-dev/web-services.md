---
layout: default
title: Intro to Web Services
parent: Web Dev Advanced
nav_order: 1
---

# Web Services

A **service** is a long-running program. It can be a website, a database, an application, an email server, etc. This page documents the following:

- Basic Linux commands
- Ports
- NGINX

## Basic Linux

This class is taught in person with computers that have Fedora Linux on them.

```bash
cd
ls
pwd
mkdir
```

### Vim

```bash
vi filename.txt
```

```
i   - Enter "insert mode" to type
ESC - Exit "insert mode"
:w  - Write changes
:q  - Quit

y   - Copy (Yank)
p   - Paste
-- alternatively --
Ctrl+Shift+C  - Copy
Ctrl+Shift+V  - Paste

dG  - Delete to the end of the file
```

## Ports

- A service can (and usually is) bound to a numbered port. The port is where users can connect to the service. For example, a website running on port 3000 can be accessed locally at `http://localhost:3000`.
- Ports less than 1024 are "privileged" (only accessible by services running as root). [Further reading from W3](https://www.w3.org/Daemon/User/Installation/PrivilegedPorts.html).
- There are various reserved default ports for common services. Here are just a few.

| port | service / protocol |
|---|---|
| 21 | ftp |
| 22 | ssh |
| 80 | http |
| 443 | https |
| 587 | smtp (email) |

You can run services on an unprivileged port as a common user.

```bash
# run an http server use the node package "serve"
npx serve
# running on http://localhost:3000 (default)
```

You cannot run this server on the privileged port 80 (http) as a normal user.

```bash
npx serve -p 80
Error: Failed to serve: Error: listen EACCES: permission denied 0.0.0.0:80
```

## NGINX

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/JKxlsvZXG7c?si=Ken_OTSae-m9NgkG" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

The solution to the privileged port problem is to have a service running as root use port 80 to serve a website. A common service is NGINX. It can be managed by `systemd` via the `systemctl` tool.

```bash
# see if nginx is installed, things you install end up in /usr/bin
which nginx
# install if needed (red hat linux like fedora)
sudo dnf install nginx -y
# enable the service and start
sudo systemctl enable nginx
sudo systemctl start nginx
# view the status
sudo systemctl status nginx
# restart the nginx service after config changes
sudo systemctl restart nginx
```

Here is where the configuration file is for the website. You can edit the file as root.

```bash
sudo vi /etc/nginx/nginx.conf
```

The file tells us that there is a server ready at port 80. It serves files in `/usr/share/nginx/html`.

```nginx
server {
    listen       80;
    listen       [::]:80;
    server_name  _;
    root         /usr/share/nginx/html;

    # Load configuration files for the default server block.
    include /etc/nginx/default.d/*.conf;
}
```

You can visit `http://localhost` or `http://localhost:80` in your browser (it's equivalent). You should see a test page. To edit the `index.html` file, you can use vim.

```bash
# put whatever html you want here and refresh http://localhost in your browser
sudo vi /usr/share/nginx/html/index.html
```

> It's a bad idea to put all of your website files in one config under the root user, we are just doing it here for convenience and so we don't have to write our own NGINX configs yet.

## Local DNS

DNS (domain name servers) match domain names with IP Addresses. For example, on your computer, there is an entry for `localhost` pointing to your computer.

```bash
# 127.0.0.1 is your local ip address
127.0.0.1    localhost
```

The file where these entries are located is `/etc/hosts`. You can edit it to add your own entries. For example, if I want to visit my website at `http://potato`, and `http://potato.potato`:

```bash
sudo vi /etc/hosts
```

```bash
# add as many entries as you'd like
127.0.0.1    localhost potato potato.potato
```

You can also visit other sites on the local network.

```bash
172.22.4.200 myneighborssite.com
```

### Extra: Block a website

If you want to never go to `google.com` on your computer, point that domain name to some other IP.

```bash
0.0.0.0      google.com
```

## Firewall and Local Network

To open port 80 on your computer to the local network, you need to create an entry in the firewall config.

```bash
sudo firewall-cmd --add-port 80/tcp --permanent
sudo firewall-cmd --reload
```

