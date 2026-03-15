import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
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
}

export async function getTeachers() {
  return prisma.teacher.findMany({
    orderBy: { name: "asc" },
  });
}

export async function getClassSummaries() {
  return prisma.schoolClass.findMany({
    orderBy: [{ yearLevel: "asc" }, { name: "asc" }],
  });
}

export async function getRphEntries() {
  return prisma.rph.findMany({
    include: {
      teacher: true,
      schoolClass: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getDskpSubjects() {
  return prisma.subject.findMany({
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
  });
}

export async function getDskpTopicSelection(topicId: string) {
  return prisma.textbookTopic.findUnique({
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
  });
}
