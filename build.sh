echo "// auto-generated by build.sh" >Jaml-all.js 
cat src/Jaml.js src/Node.js src/Template.js >>Jaml-all.js 
cat Jaml-all.js src/commonjs.js >lib/jaml.js