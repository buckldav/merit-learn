---
layout: default
title: systemd and FTP
parent: Web Dev Advanced
nav_order: 4
---

# `systemd` and FTP

For the last piece of this unit about an introduction to web services, we will talk about the program that manages all services (`systemd`) and the file transfer protocol (FTP).

## `systemd`

If you are familiar with Windows, you may have seen the "Task Manager" service. That service manages all processes on the computer including background ones. On most Linux devices, `systemd` is the equivalent, but it only focuses on background processes. The `d` in `systemd` stands for "daemon" (pronounced "demon") which means it runs in the background.

To control these services, we have been using `systemctl` e.g.

```bash
sudo systemctl status nginx
```

To see everything that `systemd` is managing, you can list the services.

```bash
sudo systemctl -l
```

## ssh config

When you have many servers that you are connecting to over ssh, you can define a list of them in a config file so that you don't have to remember a bunch of IP addresses.

```bash
# make the .ssh directory if it doesn't exist yet
mkdir -p ~/.ssh
vi ~/.ssh/config 
```

```bash
Host  yourhostname # anything you want
  User yourusername 
  Hostname 0.0.0.0 # insert correct ip
  Port 2112 # 22 by default but Mr. Buckley's server uses this.
```

Then you can connect using the `Host`.

```bash
ssh yourhostname
```

## `ftp`

`ftp` or "file transfer protocol" is a way to connect to a remote computer and transfer files easily. It runs on port 20 or 21. The secure version, `sftp` connects over `ssh` on port 22 by default.

```bash
# if configed in ssh conf
sftp hostname
# or
sftp username@hostname:port
```

Note that `ftp` uses absolute paths and behaves kind of like a minimal shell.`

```
sftp> ls
sftp> cd directory
sftp> put /path/to/file.txt         # from you to the server
sftp> get /path/to/remote/file.txt  # from the server to you
```
