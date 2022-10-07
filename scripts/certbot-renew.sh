#!/bin/sh

sudo docker run -it --rm --name certbot \
  -v "${CERTBOT_PATH}/conf:/etc/letsencrypt" \
  -v "${CERTBOT_PATH}/www:/var/lib/letsencrypt" \
  certbot/certbot renew
