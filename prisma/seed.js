const prisma = require("../prisma");

const seed = async ( numTracks =25)=>{
    const tracks = Array.from({ length : numTracks}, (_,i)=>({
        name : `${i+1}`
    }))
    await prisma.track.createMany({ data: tracks});
};

seed()
.then(async ()=> await prisma.$disconnect())
.catch(async (e) => {
    console.errer(e);
    await prisma.$disconnect();
    process.exit(1);
});