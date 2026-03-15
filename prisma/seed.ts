import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.rph.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.schoolClass.deleteMany();

  const teacherA = await prisma.teacher.create({
    data: {
      name: "Cikgu Farid",
      email: "farid@delima.edu.my",
      role: "Guru Bahasa Melayu",
      status: "Aktif",
      workload: 26,
      subject: "Bahasa Melayu",
    },
  });

  const teacherB = await prisma.teacher.create({
    data: {
      name: "Cikgu Liyana",
      email: "liyana@delima.edu.my",
      role: "Guru Matematik",
      status: "Aktif",
      workload: 24,
      subject: "Matematik",
    },
  });

  const teacherC = await prisma.teacher.create({
    data: {
      name: "PK Noraini",
      email: "noraini@delima.edu.my",
      role: "Penyemak RPH",
      status: "Semakan",
      workload: 12,
      subject: "Pentadbiran",
    },
  });

  const classA = await prisma.schoolClass.create({
    data: {
      name: "1 Bestari",
      yearLevel: 1,
      pupilCount: 34,
      status: "Sedia semak",
      imported: 100,
      notes: "Semua murid aktif dan lengkap",
    },
  });

  const classB = await prisma.schoolClass.create({
    data: {
      name: "4 Cemerlang",
      yearLevel: 4,
      pupilCount: 36,
      status: "Kemas kini",
      imported: 92,
      notes: "3 murid baharu belum dipadankan",
    },
  });

  const classC = await prisma.schoolClass.create({
    data: {
      name: "6 Wawasan",
      yearLevel: 6,
      pupilCount: 32,
      status: "Lengkap",
      imported: 100,
      notes: "Data bersedia untuk pelaporan akhir",
    },
  });

  await prisma.student.createMany({
    data: [
      {
        fullName: "Aina Sofea",
        className: classA.name,
        attendanceNo: 1,
        status: "Aktif",
        schoolClassId: classA.id,
      },
      {
        fullName: "Muhammad Irfan",
        className: classA.name,
        attendanceNo: 2,
        status: "Aktif",
        schoolClassId: classA.id,
      },
      {
        fullName: "Nur Qistina",
        className: classB.name,
        attendanceNo: 5,
        status: "Aktif",
        schoolClassId: classB.id,
      },
      {
        fullName: "Daniel Tan",
        className: classB.name,
        attendanceNo: 6,
        status: "Perpindahan dikemas kini",
        schoolClassId: classB.id,
      },
      {
        fullName: "Siti Hajar",
        className: classC.name,
        attendanceNo: 3,
        status: "Aktif",
        schoolClassId: classC.id,
      },
      {
        fullName: "Adam Hakim",
        className: classC.name,
        attendanceNo: 4,
        status: "Aktif",
        schoolClassId: classC.id,
      },
    ],
  });

  await prisma.rph.createMany({
    data: [
      {
        title: "Karangan respons terhad",
        week: "Minggu 12",
        status: "Draf",
        updatedLabel: "15 Mac 2026, 09:10",
        subject: "Bahasa Melayu Tahun 5",
        objective: "Murid dapat menulis karangan pendek berdasarkan gambar.",
        teacherId: teacherA.id,
        schoolClassId: classB.id,
      },
      {
        title: "Operasi pecahan",
        week: "Minggu 12",
        status: "Dihantar",
        updatedLabel: "14 Mac 2026, 16:40",
        subject: "Matematik Tahun 4",
        objective: "Murid dapat menyelesaikan soalan tambah dan tolak pecahan.",
        teacherId: teacherB.id,
        schoolClassId: classB.id,
      },
      {
        title: "Eksperimen tenaga",
        week: "Minggu 12",
        status: "Disemak",
        updatedLabel: "13 Mac 2026, 11:20",
        subject: "Sains Tahun 6",
        objective: "Murid dapat mengenal pasti sumber tenaga boleh baharu.",
        teacherId: teacherC.id,
        schoolClassId: classC.id,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
