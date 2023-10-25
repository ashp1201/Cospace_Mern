const buffer = Buffer.alloc(20);
 // Create a buffer of size 20

const message = "Hello world";
buffer.write(message, 0, "utf8"); 
// Write the string to the buffer at position 0 with UTF-8 encoding

const output = buffer.toString("utf8"); 
// Convert the buffer back to a string with UTF-8 encoding

console.log(output); 
// Display the output
