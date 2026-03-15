import { prisma } from "@/lib/prisma";

const fallbackTeachers = [
  {
    id: "teacher-1",
    name: "Cikgu Farid",
    email: "farid@delima.edu.my",
    role: "Guru Bahasa Melayu",
    status: "Aktif",
    workload: 26,
    subject: "Bahasa Melayu",
  },
  {
    id: "teacher-2",
    name: "Cikgu Liyana",
    email: "liyana@delima.edu.my",
    role: "Guru Matematik",
    status: "Aktif",
    workload: 24,
    subject: "Matematik",
  },
  {
    id: "teacher-3",
    name: "PK Noraini",
    email: "noraini@delima.edu.my",
    role: "Penyemak RPH",
    status: "Semakan",
    workload: 12,
    subject: "Pentadbiran",
  },
];

const fallbackClasses = [
  {
    id: "class-1",
    name: "1 Bestari",
    yearLevel: 1,
    pupilCount: 34,
    status: "Sedia semak",
    imported: 100,
    notes: "Semua murid aktif dan lengkap",
  },
  {
    id: "class-2",
    name: "4 Cemerlang",
    yearLevel: 4,
    pupilCount: 36,
    status: "Kemas kini",
    imported: 92,
    notes: "3 murid baharu belum dipadankan",
  },
  {
    id: "class-3",
    name: "6 Wawasan",
    yearLevel: 6,
    pupilCount: 32,
    status: "Lengkap",
    imported: 100,
    notes: "Data bersedia untuk pelaporan akhir",
  },
];

const fallbackRphEntries = [
  {
    id: "rph-1",
    title: "Karangan respons terhad",
    week: "Minggu 12",
    status: "Draf",
    updatedLabel: "15 Mac 2026, 09:10",
    subject: "Bahasa Melayu Tahun 5",
    objective: "Murid dapat menulis karangan pendek berdasarkan gambar.",
    teacher: { name: "Cikgu Farid" },
    schoolClass: { name: "4 Cemerlang" },
  },
  {
    id: "rph-2",
    title: "Operasi pecahan",
    week: "Minggu 12",
    status: "Dihantar",
    updatedLabel: "14 Mac 2026, 16:40",
    subject: "Matematik Tahun 4",
    objective: "Murid dapat menyelesaikan soalan tambah dan tolak pecahan.",
    teacher: { name: "Cikgu Liyana" },
    schoolClass: { name: "4 Cemerlang" },
  },
  {
    id: "rph-3",
    title: "Eksperimen tenaga",
    week: "Minggu 12",
    status: "Disemak",
    updatedLabel: "13 Mac 2026, 11:20",
    subject: "Sains Tahun 6",
    objective: "Murid dapat mengenal pasti sumber tenaga boleh baharu.",
    teacher: { name: "PK Noraini" },
    schoolClass: { name: "6 Wawasan" },
  },
];

const fallbackDskpSubjects = [
  {
    id: "subject-bm",
    code: "SJKC-BM",
    name: "Bahasa Melayu",
    stream: "SJKC",
    language: "Malay",
    yearLevels: "Tahun 4-6",
    syllabus: "KSSR Semakan",
    textbooks: [
      {
        id: "book-bm-4",
        title: "Bahasa Melayu Tahun 4 SJKC",
        yearLevel: 4,
        volumeLabel: "Buku Teks",
        publisher: "KPM Digital",
        notes: "Set contoh untuk pemilihan standard berasaskan unit.",
        topics: [
          {
            id: "topic-bm-1",
            unitCode: "BM1",
            title: "Jiran Sepakat",
            sequence: 1,
            focus: "Kemahiran mendengar dan bertutur",
            mappings: [
              {
                id: "map-bm-1",
                rationale: "Unit ini sesuai untuk aktiviti komunikasi harian.",
                standard: {
                  standardType: "SK",
                  code: "BM-1.2",
                  description:
                    "Mendengar, mengecam dan memberikan respons terhadap ujaran.",
                  notes: "Diguna untuk aktiviti lisan dan dialog.",
                },
              },
              {
                id: "map-bm-2",
                rationale: "Guru boleh gunakan gambar dan situasi kejiranan.",
                standard: {
                  standardType: "SP",
                  code: "BM-1.2.2",
                  description:
                    "Menjelaskan maklumat berdasarkan bahan rangsangan.",
                  notes: "Sesuai untuk aktiviti perbualan berpandu.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "subject-mt",
    code: "SJKC-MT",
    name: "Matematik",
    stream: "SJKC",
    language: "Chinese",
    yearLevels: "Tahun 4-6",
    syllabus: "KSSR Semakan",
    textbooks: [
      {
        id: "book-mt-4",
        title: "Matematik Tahun 4 SJKC",
        yearLevel: 4,
        volumeLabel: "Buku Teks Jilid 1",
        publisher: "KPM Digital",
        notes: "Padanan contoh mengikut topik utama awal tahun.",
        topics: [
          {
            id: "topic-mt-1",
            unitCode: "1",
            title: "Nombor Bulat Hingga 100 000",
            sequence: 1,
            focus: "Nilai tempat dan perbandingan nombor",
            mappings: [
              {
                id: "map-mt-1",
                rationale: "Topik ini terus selari dengan nombor bulat.",
                standard: {
                  standardType: "SK",
                  code: "MT-1.1",
                  description: "Memahami nombor bulat hingga 100 000.",
                  notes: "Nilai tempat, banding dan susun nombor.",
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

async function safeQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch (error) {
    console.warn("Falling back to demo data because database is unavailable.", error);
    return fallback;
  }
}

export async function getDashboardData() {
  return safeQuery(async () => {
    const [teacherCount, studentCount, rphCount, pendingRphCount] =
      await Promise.all([
        prisma.teacher.count(),
        prisma.student.count(),
        prisma.rph.count(),
        prisma.rph.count({ where: { status: { in: ["Draf", "Dihantar"] } } }),
      ]);

    const latestRph = await prisma.rph.findMany({
      include: {
        teacher: true,
        schoolClass: true,
      },
      orderBy: { updatedAt: "desc" },
      take: 3,
    });

    return {
      metrics: [
        {
          label: "RPH dalam sistem",
          value: String(rphCount),
          detail: `${pendingRphCount} masih perlukan tindakan`,
        },
        {
          label: "Murid aktif",
          value: studentCount.toLocaleString("en-US"),
          detail: "Rekod murid disimpan dalam pangkalan data",
        },
        {
          label: "Guru berdaftar",
          value: String(teacherCount),
          detail: "Staf dan penyemak aktif",
        },
        {
          label: "RPH disemak",
          value: String(rphCount - pendingRphCount),
          detail: "Sedia untuk cetakan dan laporan",
        },
      ],
      latestRph,
    };
  }, {
    metrics: [
      {
        label: "RPH dalam sistem",
        value: String(fallbackRphEntries.length),
        detail: "Mod demo semasa deployment",
      },
      {
        label: "Murid aktif",
        value: "102",
        detail: "Data contoh sementara database belum disambung",
      },
      {
        label: "Guru berdaftar",
        value: String(fallbackTeachers.length),
        detail: "Data guru demo",
      },
      {
        label: "RPH disemak",
        value: "1",
        detail: "Baki rekod dalam mod demo",
      },
    ],
    latestRph: fallbackRphEntries,
  });
}

export async function getTeachers() {
  return safeQuery(
    () =>
      prisma.teacher.findMany({
        orderBy: { name: "asc" },
      }),
    fallbackTeachers,
  );
}

export async function getClassSummaries() {
  return safeQuery(
    () =>
      prisma.schoolClass.findMany({
        orderBy: [{ yearLevel: "asc" }, { name: "asc" }],
      }),
    fallbackClasses,
  );
}

export async function getRphEntries() {
  return safeQuery(
    () =>
      prisma.rph.findMany({
        include: {
          teacher: true,
          schoolClass: true,
        },
        orderBy: { updatedAt: "desc" },
      }),
    fallbackRphEntries,
  );
}

export async function getDskpSubjects() {
  return safeQuery(
    () =>
      prisma.subject.findMany({
        include: {
          textbooks: {
            include: {
              topics: {
                include: {
                  mappings: {
                    include: {
                      standard: true,
                    },
                    orderBy: {
                      standard: {
                        code: "asc",
                      },
                    },
                  },
                },
                orderBy: { sequence: "asc" },
              },
            },
            orderBy: [{ yearLevel: "asc" }, { title: "asc" }],
          },
        },
        orderBy: { name: "asc" },
      }),
    fallbackDskpSubjects,
  );
}

export async function getDskpTopicSelection(topicId: string) {
  const fallbackTopic =
    fallbackDskpSubjects
      .flatMap((subject) =>
        subject.textbooks.flatMap((textbook) =>
          textbook.topics.map((topic) => ({
            ...topic,
            textbook: {
              id: textbook.id,
              title: textbook.title,
              subject: {
                id: subject.id,
                name: subject.name,
              },
            },
          })),
        ),
      )
      .find((topic) => topic.id === topicId) ?? null;

  return safeQuery(
    () =>
      prisma.textbookTopic.findUnique({
        where: { id: topicId },
        include: {
          textbook: {
            include: {
              subject: true,
            },
          },
          mappings: {
            include: {
              standard: true,
            },
            orderBy: {
              standard: {
                code: "asc",
              },
            },
          },
        },
      }),
    fallbackTopic,
  );
}
