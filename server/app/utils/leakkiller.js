



exports.free = (source, destination) => {
    destination.on('close', () => {
        source.destroy();
     });
     
     destination.on('error', () => {
        source.destroy();
     });
     
     source.on('error', () => {
       destination.destroy();
     });
     
     source.on('end', () => {
        destination.destroy();
     });
     
}