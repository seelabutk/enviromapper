./download_environment_layers.sh
./extract_continuous.py layers/cat_type_disturbance.geojson

./extract_subcategory.sh layers/cat_type_disturbance.geojson cat_type_disturbance FCSUBTYPE
./merge_disturbance_subcategory.sh

./extract_subcategory_understory_density.sh layers/cat_understory_density_class.geojson cat_understory_density_class
./merge_understory_density.sh