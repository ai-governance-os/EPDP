import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function resetDatabase() {
  await prisma.$transaction([
    prisma.topicStandardMapping.deleteMany(),
    prisma.textbookTopic.deleteMany(),
    prisma.textbook.deleteMany(),
    prisma.dskpStandard.deleteMany(),
    prisma.subject.deleteMany(),
    prisma.rph.deleteMany(),
    prisma.student.deleteMany(),
    prisma.teacher.deleteMany(),
    prisma.schoolClass.deleteMany(),
  ]);
}

async function seedSchoolCore() {
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

async function seedDskpModule() {
  async function createSubjectBundle(input: {
    code: string;
    name: string;
    language: string;
    yearLevels: string;
    textbookTitle: string;
    yearLevel: number;
    volumeLabel: string;
    notes: string;
    topics: Array<{
      unitCode: string;
      title: string;
      focus: string;
      mappings: Array<{
        standardType: string;
        code: string;
        description: string;
        notes: string;
        rationale: string;
      }>;
    }>;
  }) {
    const subject = await prisma.subject.create({
      data: {
        code: input.code,
        name: input.name,
        stream: "SJKC",
        language: input.language,
        yearLevels: input.yearLevels,
        syllabus: "KSSR Semakan",
      },
    });

    const textbook = await prisma.textbook.create({
      data: {
        subjectId: subject.id,
        title: input.textbookTitle,
        yearLevel: input.yearLevel,
        volumeLabel: input.volumeLabel,
        publisher: "KPM Digital",
        notes: input.notes,
      },
    });

    for (let index = 0; index < input.topics.length; index += 1) {
      const topicData = input.topics[index];
      const topic = await prisma.textbookTopic.create({
        data: {
          textbookId: textbook.id,
          unitCode: topicData.unitCode,
          title: topicData.title,
          sequence: index + 1,
          focus: topicData.focus,
        },
      });

      for (const mapping of topicData.mappings) {
        const standard = await prisma.dskpStandard.create({
          data: {
            subjectId: subject.id,
            yearLevel: input.yearLevel,
            standardType: mapping.standardType,
            code: mapping.code,
            description: mapping.description,
            notes: mapping.notes,
          },
        });

        await prisma.topicStandardMapping.create({
          data: {
            topicId: topic.id,
            standardId: standard.id,
            rationale: mapping.rationale,
          },
        });
      }
    }
  }

  const bahasaCina = await prisma.subject.create({
    data: {
      code: "SJKC-BC",
      name: "Bahasa Cina",
      stream: "SJKC",
      language: "Chinese",
      yearLevels: "Tahun 4-6",
      syllabus: "KSSR Semakan",
    },
  });

  const matematik = await prisma.subject.create({
    data: {
      code: "SJKC-MT",
      name: "Matematik",
      stream: "SJKC",
      language: "Chinese",
      yearLevels: "Tahun 4-6",
      syllabus: "KSSR Semakan",
    },
  });

  const sains = await prisma.subject.create({
    data: {
      code: "SJKC-SN",
      name: "Sains",
      stream: "SJKC",
      language: "Chinese",
      yearLevels: "Tahun 4-6",
      syllabus: "KSSR Semakan",
    },
  });

  const bcYear4Book = await prisma.textbook.create({
    data: {
      subjectId: bahasaCina.id,
      title: "Bahasa Cina Tahun 4",
      yearLevel: 4,
      volumeLabel: "Buku Teks",
      publisher: "KPM Digital",
      notes: "Set permulaan untuk padanan DSKP dan unit buku teks.",
    },
  });

  const mtYear4Book = await prisma.textbook.create({
    data: {
      subjectId: matematik.id,
      title: "Matematik Tahun 4 SJKC",
      yearLevel: 4,
      volumeLabel: "Buku Teks Jilid 1",
      publisher: "KPM Digital",
      notes: "Padanan contoh mengikut topik utama awal tahun.",
    },
  });

  const snYear5Book = await prisma.textbook.create({
    data: {
      subjectId: sains.id,
      title: "Sains Tahun 5 SJKC",
      yearLevel: 5,
      volumeLabel: "Buku Teks",
      publisher: "KPM Digital",
      notes: "Contoh awal untuk modul pilihan guru.",
    },
  });

  const bcTopic1 = await prisma.textbookTopic.create({
    data: {
      textbookId: bcYear4Book.id,
      unitCode: "U1",
      title: "\u6821\u56ed\u65b0\u751f\u6d3b",
      sequence: 1,
      focus: "\u542c\u8bf4\u4e0e\u57fa\u7840\u9605\u8bfb",
    },
  });

  const bcTopic2 = await prisma.textbookTopic.create({
    data: {
      textbookId: bcYear4Book.id,
      unitCode: "U2",
      title: "\u6211\u7684\u5bb6\u4eba",
      sequence: 2,
      focus: "\u53e3\u8bed\u8868\u8fbe\u4e0e\u4e66\u5199\u53e5\u5b50",
    },
  });

  const mtTopic1 = await prisma.textbookTopic.create({
    data: {
      textbookId: mtYear4Book.id,
      unitCode: "1",
      title: "Nombor Bulat Hingga 100 000",
      sequence: 1,
      focus: "Nilai tempat dan perbandingan nombor",
    },
  });

  const mtTopic2 = await prisma.textbookTopic.create({
    data: {
      textbookId: mtYear4Book.id,
      unitCode: "2",
      title: "Tambah dan Tolak",
      sequence: 2,
      focus: "Operasi asas penyelesaian masalah",
    },
  });

  const snTopic1 = await prisma.textbookTopic.create({
    data: {
      textbookId: snYear5Book.id,
      unitCode: "1",
      title: "Kemahiran Saintifik",
      sequence: 1,
      focus: "Pemerhatian dan inferens",
    },
  });

  const snTopic2 = await prisma.textbookTopic.create({
    data: {
      textbookId: snYear5Book.id,
      unitCode: "2",
      title: "Manusia",
      sequence: 2,
      focus: "Sistem tubuh dan penjagaan kesihatan",
    },
  });

  const standardRecords = await Promise.all([
    prisma.dskpStandard.create({
      data: {
        subjectId: bahasaCina.id,
        yearLevel: 4,
        standardType: "SK",
        code: "BC-1.1",
        description: "\u8046\u542c\u5e76\u7406\u89e3\u8bfe\u5802\u4e0e\u65e5\u5e38\u8bed\u5883\u4e2d\u7684\u7b80\u5355\u8bed\u53e5\u3002",
        notes: "Digunakan untuk aktiviti mendengar dan memberi respons.",
      },
    }),
    prisma.dskpStandard.create({
      data: {
        subjectId: bahasaCina.id,
        yearLevel: 4,
        standardType: "SP",
        code: "BC-1.1.2",
        description: "\u80fd\u6839\u636e\u60c5\u5883\u8bf4\u51fa\u76f8\u5173\u4fe1\u606f\u5e76\u4f5c\u51fa\u56de\u5e94\u3002",
        notes: "Sesuai untuk perbualan berpandu.",
      },
    }),
    prisma.dskpStandard.create({
      data: {
        subjectId: bahasaCina.id,
        yearLevel: 4,
        standardType: "SP",
        code: "BC-3.2.1",
        description: "\u80fd\u4e66\u5199\u6b63\u786e\u901a\u987a\u7684\u7b80\u5355\u53e5\u5b50\u3002",
        notes: "Boleh digabungkan dengan latihan penulisan asas.",
      },
    }),
    prisma.dskpStandard.create({
      data: {
        subjectId: matematik.id,
        yearLevel: 4,
        standardType: "SK",
        code: "MT-1.1",
        description: "Memahami nombor bulat hingga 100 000.",
        notes: "Nilai tempat, banding dan susun nombor.",
      },
    }),
    prisma.dskpStandard.create({
      data: {
        subjectId: matematik.id,
        yearLevel: 4,
        standardType: "SP",
        code: "MT-1.1.1",
        description: "Membaca, menyebut dan menulis nombor bulat hingga 100 000.",
        notes: "Diguna untuk pengenalan topik.",
      },
    }),
    prisma.dskpStandard.create({
      data: {
        subjectId: matematik.id,
        yearLevel: 4,
        standardType: "SP",
        code: "MT-2.1.2",
        description: "Menyelesaikan ayat matematik tambah dan tolak dalam lingkungan 100 000.",
        notes: "Sesuai untuk latihan buku aktiviti.",
      },
    }),
    prisma.dskpStandard.create({
      data: {
        subjectId: sains.id,
        yearLevel: 5,
        standardType: "SK",
        code: "SN-1.1",
        description: "Memahami kemahiran proses sains.",
        notes: "Aktiviti pemerhatian, klasifikasi dan inferens.",
      },
    }),
    prisma.dskpStandard.create({
      data: {
        subjectId: sains.id,
        yearLevel: 5,
        standardType: "SP",
        code: "SN-1.1.1",
        description: "Menggunakan pemerhatian dan inferens dalam penyiasatan mudah.",
        notes: "Boleh terus dipadankan dengan eksperimen awal tahun.",
      },
    }),
    prisma.dskpStandard.create({
      data: {
        subjectId: sains.id,
        yearLevel: 5,
        standardType: "SP",
        code: "SN-3.2.2",
        description: "Menjelaskan kepentingan menjaga sistem tubuh manusia.",
        notes: "Sesuai untuk perbincangan dan projek mini.",
      },
    }),
  ]);

  const standardByCode = new Map(standardRecords.map((item) => [item.code, item.id]));

  await prisma.topicStandardMapping.createMany({
    data: [
      {
        topicId: bcTopic1.id,
        standardId: standardByCode.get("BC-1.1")!,
        rationale: "Unit pembukaan sesuai untuk mendengar arahan dan memperkenalkan diri.",
      },
      {
        topicId: bcTopic1.id,
        standardId: standardByCode.get("BC-1.1.2")!,
        rationale: "Murid memberi respons ringkas berdasarkan situasi sekolah.",
      },
      {
        topicId: bcTopic2.id,
        standardId: standardByCode.get("BC-3.2.1")!,
        rationale: "Latihan membina ayat berkaitan ahli keluarga.",
      },
      {
        topicId: mtTopic1.id,
        standardId: standardByCode.get("MT-1.1")!,
        rationale: "Topik ini terus selari dengan nombor bulat.",
      },
      {
        topicId: mtTopic1.id,
        standardId: standardByCode.get("MT-1.1.1")!,
        rationale: "Pengenalan membaca dan menulis nombor besar.",
      },
      {
        topicId: mtTopic2.id,
        standardId: standardByCode.get("MT-2.1.2")!,
        rationale: "Latihan operasi tambah dan tolak pada unit kedua.",
      },
      {
        topicId: snTopic1.id,
        standardId: standardByCode.get("SN-1.1")!,
        rationale: "Unit awal membina kemahiran saintifik asas.",
      },
      {
        topicId: snTopic1.id,
        standardId: standardByCode.get("SN-1.1.1")!,
        rationale: "Murid membuat pemerhatian dan inferens mudah.",
      },
      {
        topicId: snTopic2.id,
        standardId: standardByCode.get("SN-3.2.2")!,
        rationale: "Topik manusia dikaitkan dengan penjagaan kesihatan tubuh.",
      },
    ],
  });

  await createSubjectBundle({
    code: "SJKC-BM",
    name: "Bahasa Melayu",
    language: "Malay",
    yearLevels: "Tahun 4-6",
    textbookTitle: "Bahasa Melayu Tahun 4 SJKC",
    yearLevel: 4,
    volumeLabel: "Buku Teks",
    notes: "Set contoh untuk pemilihan standard berasaskan unit.",
    topics: [
      {
        unitCode: "BM1",
        title: "Jiran Sepakat",
        focus: "Kemahiran mendengar dan bertutur",
        mappings: [
          {
            standardType: "SK",
            code: "BM-1.2",
            description: "Mendengar, mengecam dan memberikan respons terhadap ujaran.",
            notes: "Diguna untuk aktiviti lisan dan dialog.",
            rationale: "Unit ini sesuai untuk aktiviti komunikasi harian.",
          },
          {
            standardType: "SP",
            code: "BM-1.2.2",
            description: "Menjelaskan maklumat berdasarkan bahan rangsangan.",
            notes: "Sesuai untuk aktiviti perbualan berpandu.",
            rationale: "Guru boleh gunakan gambar dan situasi kejiranan.",
          },
        ],
      },
      {
        unitCode: "BM2",
        title: "Amalan Bersih",
        focus: "Kemahiran menulis dan membina ayat",
        mappings: [
          {
            standardType: "SP",
            code: "BM-3.3.1",
            description: "Membina dan menulis ayat yang gramatis.",
            notes: "Boleh digabungkan dengan latihan buku teks.",
            rationale: "Topik kebersihan sesuai untuk latihan ayat lengkap.",
          },
        ],
      },
    ],
  });

  await createSubjectBundle({
    code: "SJKC-BI",
    name: "English",
    language: "English",
    yearLevels: "Year 4-6",
    textbookTitle: "English Year 4 SJKC",
    yearLevel: 4,
    volumeLabel: "Textbook",
    notes: "Starter mappings for CEFR-aligned classroom selection.",
    topics: [
      {
        unitCode: "EN1",
        title: "Where Are You From?",
        focus: "Speaking and listening",
        mappings: [
          {
            standardType: "SK",
            code: "BI-1.1",
            description: "Understand main idea from simple spoken texts.",
            notes: "Useful for classroom exchanges and listening tasks.",
            rationale: "Topic introduces pupils to short personal responses.",
          },
          {
            standardType: "SP",
            code: "BI-2.1.1",
            description: "Give detailed information about themselves and others.",
            notes: "Can be used in pair speaking activities.",
            rationale: "Pupils introduce themselves using guided questions.",
          },
        ],
      },
      {
        unitCode: "EN2",
        title: "My Week",
        focus: "Reading and guided writing",
        mappings: [
          {
            standardType: "SP",
            code: "BI-3.2.2",
            description: "Understand specific information in simple texts.",
            notes: "Works with timetable and weekly routine tasks.",
            rationale: "Unit reading passages map neatly to routine vocabulary.",
          },
        ],
      },
    ],
  });

  await createSubjectBundle({
    code: "SJKC-MORAL",
    name: "Pendidikan Moral",
    language: "Malay",
    yearLevels: "Tahun 4-6",
    textbookTitle: "Pendidikan Moral Tahun 4 SJKC",
    yearLevel: 4,
    volumeLabel: "Buku Teks",
    notes: "Contoh awal untuk nilai dan refleksi murid.",
    topics: [
      {
        unitCode: "PM1",
        title: "Berterima Kasih",
        focus: "Penghayatan nilai dalam kehidupan harian",
        mappings: [
          {
            standardType: "SK",
            code: "PM-2.1",
            description: "Memahami dan mengamalkan nilai berterima kasih.",
            notes: "Boleh disambung dengan aktiviti refleksi.",
            rationale: "Unit ini sesuai untuk aktiviti situasi harian murid.",
          },
          {
            standardType: "SP",
            code: "PM-2.1.1",
            description: "Menjelaskan cara mengamalkan nilai berterima kasih.",
            notes: "Sesuai untuk dialog dan jurnal ringkas.",
            rationale: "Pupils can relate the value to classroom examples.",
          },
        ],
      },
      {
        unitCode: "PM2",
        title: "Tanggungjawab Bersama",
        focus: "Amalan tanggungjawab di sekolah",
        mappings: [
          {
            standardType: "SP",
            code: "PM-4.2.2",
            description: "Menghuraikan kepentingan bertanggungjawab terhadap komuniti sekolah.",
            notes: "Boleh dijadikan aktiviti projek mini.",
            rationale: "Topic matches school cleanliness and class duty activities.",
          },
        ],
      },
    ],
  });

  await createSubjectBundle({
    code: "SJKC-SEJ",
    name: "Sejarah",
    language: "Malay",
    yearLevels: "Tahun 4-6",
    textbookTitle: "Sejarah Tahun 4 SJKC",
    yearLevel: 4,
    volumeLabel: "Buku Teks",
    notes: "Padanan permulaan untuk sejarah tempatan dan identiti negara.",
    topics: [
      {
        unitCode: "SJ1",
        title: "Mengenali Sejarah",
        focus: "Konsep masa, sumber dan bukti",
        mappings: [
          {
            standardType: "SK",
            code: "SJ-1.1",
            description: "Memahami pengertian sejarah dan sumber sejarah.",
            notes: "Sesuai untuk aktiviti inkuiri awal.",
            rationale: "Topik pembukaan membantu murid memahami asas subjek.",
          },
          {
            standardType: "SP",
            code: "SJ-1.1.2",
            description: "Menjelaskan contoh sumber sejarah di persekitaran murid.",
            notes: "Boleh dikaitkan dengan gambar, artifak dan keluarga.",
            rationale: "Pupils can identify local and family history evidence.",
          },
        ],
      },
      {
        unitCode: "SJ2",
        title: "Negaraku Tercinta",
        focus: "Identiti negara dan simbol kebangsaan",
        mappings: [
          {
            standardType: "SP",
            code: "SJ-5.1.3",
            description: "Menerangkan kepentingan menghormati lambang kebangsaan.",
            notes: "Sesuai untuk aktiviti penerangan dan projek poster.",
            rationale: "Unit ini mudah dipadankan dengan amalan patriotik sekolah.",
          },
        ],
      },
    ],
  });
}

async function main() {
  await resetDatabase();
  await seedSchoolCore();
  await seedDskpModule();
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
