// In-memory data storage
let students = [
  { id: 1, name: "Chidi Okafor", 
    email: "chidi.okafor@gmail.com", 
    homeAddress: "14 Herbert Macaulay Way, Yaba, Lagos", 
    nextOfKin: "Amaka Okafor (Mother)" },
  { id: 2, name: "Amina Yusuf", 
    email: "amina.yusuf@gmail.com", 
    homeAddress: "42 Gwarinpa Estate, Avenue 3, Abuja", 
    nextOfKin: "Ibrahim Yusuf (Father)" },
  { id: 3, name: "Babajide Balogun",
     email: "jide.balogun@gmail.com", 
     homeAddress: "7 Ring Road, Challenge, Ibadan", 
     nextOfKin: "Funmi Balogun (Wife)" }
];

// Database controller functions
const db = {
  getAll: () => students,
  
  getById: (id) => students.find(s => s.id === id),
  
  create: (data) => {
    const nextId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    const newStudent = {
      id: nextId,
      name: data.name,
      email: data.email,
      homeAddress: data.homeAddress || "Not Provided",
      nextOfKin: data.nextOfKin || "Not Provided"
    };
    students.push(newStudent);
    return newStudent;
  },
  
  update: (id, data) => {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    students[index] = { ...students[index], ...data, id };
    return students[index];
  },
  
  delete: (id) => {
    const index = students.findIndex(s => s.id === id);
    if (index === -1) return null;
    
    return students.splice(index, 1)[0];
  }
};

module.exports = db;