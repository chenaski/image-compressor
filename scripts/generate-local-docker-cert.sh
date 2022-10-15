CERT_DIR=".docker/sertbot/conf/live/0.0.0.0/"

mkdir -p "$CERT_DIR"
mkcert -install \
  -key-file "$CERT_DIR/privkey.pem" \
  -cert-file "$CERT_DIR/fullchain.pem" \
  localhost 127.0.0.1 0.0.0.0 ::1
