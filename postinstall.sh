echo "POSTINSTALL"
cp -f ./node_modules/@ethicdevs/json-tree-view/dist/index.css ./assets/js/vendor/json-tree-view/
cp -f ./node_modules/@ethicdevs/json-tree-view/dist/index.js ./assets/js/vendor/json-tree-view/
FILENAME=./assets/js/vendor/json-tree-view/index.js
perl -pi -e 's/export //g' $FILENAME