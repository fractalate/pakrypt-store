# Pakrypt Store

This is a prototype storage service for Pakrypt. It can store a single string protected by a key of your choice.

## Running the Service

Generate a random key and add it to the file `keyfile`. This will generate a key with python3:

```bash
python3 -c 'import random; import string; print("".join([random.choice(string.ascii_letters + string.digits) for _ in range(64)]))' > keyfile
```

Install and build the software:

```bash
npm install .
npm run build
```

Run the software:

```bash
node dist/index.js
```

## Using the Service

Let's say your key stored in `keyfile` is `XYZ1234`. To write the string for this server:

```bash
curl -X POST -H 'x-api-key: XYZ1234' -H 'content-type: text/plain' -d 'mydata' http://127.0.0.1:3000/
```

To read the string from this server:

```bash
curl -H 'x-api-key: XYZ1234' http://127.0.0.1:3000/
```

Your string is stored in the file `datafile`.
