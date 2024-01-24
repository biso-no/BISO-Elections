import { z } from "zod";

import { desc, eq, schema } from "@acme/db";

import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const learningRouter = createTRPCRouter({
  all: adminProcedure.query(({ ctx }) => {
    return ctx.db.query.course.findMany({
      orderBy: desc(schema.course.id),
      columns: {
        name: true,
        description: true,
        createdAt: true,
        createdBy: true,
        id: true,
        image: true,
        logo: true,
        updatedAt: true,
      },
      limit: 20,
    });
  }),
  allCourses: protectedProcedure.query(({ ctx }) => {
    return ctx.db.query.course.findMany({
      orderBy: desc(schema.course.id),
      columns: {
        name: true,
        description: true,
        createdAt: true,
        createdBy: true,
        id: true,
        image: true,
        logo: true,
        updatedAt: true,
      },
      with: {
        lessons: {
          with: {
            pages: {
              with: {
                chapterProgress: {
                  columns: {
                    progress: true,
                  },
                  where: eq(schema.chapterProgress.userId, ctx.user.id),
                },
              },
            },
          },
        },
      },
      limit: 20,
    });
  }),
  mine: adminProcedure.query(({ ctx }) => {
    return ctx.db.query.course.findMany({
      where: eq(schema.course.createdBy, ctx.user.id),
    });
  }),
  byId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.course.findFirst({
        where: eq(schema.course.id, input.id),
        columns: {
          id: true,
          name: true,
          description: true,
          logo: true,
          image: true,
          createdAt: true,
          createdBy: true,
        },
        with: {
          lessons: {
            columns: {
              courseId: true,
              name: true,
              description: true,
              createdAt: true,
              createdBy: true,
              id: true,
            },
            with: {
              course: {
                columns: {
                  name: true,
                  description: true,
                  createdAt: true,
                  createdBy: true,
                  id: true,
                },
                with: {
                  lessons: {
                    columns: {
                      courseId: true,
                      name: true,
                      description: true,
                      createdAt: true,
                      createdBy: true,
                      id: true,
                    },
                    with: {
                      pages: {
                        columns: {
                          lessonId: true,
                          name: true,
                          description: true,
                          createdAt: true,
                          createdBy: true,
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        logo: z.string().min(1),
        image: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create a course
      return ctx.db
        .insert(schema.course)
        .values({
          name: input.name,
          description: input.description,
          logo: input.logo,
          image: input.image,
          createdBy: ctx.user.id,
        })
        .returning();
    }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        logo: z.string().min(1).optional(),
        image: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.course)
        .set({
          name: input.name,
          description: input.description,
          logo: input.logo,
          image: input.image,
        })
        .where(eq(schema.course.id, input.id));
    }),
  delete: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(schema.course).where(eq(schema.course.id, input.id));
    }),
  lessons: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.lesson.findMany({
        where: eq(schema.lesson.courseId, input.id),
        with: {
          pages: {
            columns: {
              lessonId: true,
              name: true,
              description: true,
              createdAt: true,
              createdBy: true,
              id: true,
              type: true,
            },
          },
        },
      });
    }),
  lesson: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.lesson.findFirst({
        where: eq(schema.lesson.id, input.id),
      });
    }),
  createLesson: adminProcedure
    .input(
      z.object({
        courseId: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create a course
      return ctx.db
        .insert(schema.lesson)
        .values({
          courseId: input.courseId,
          name: input.name,
          description: input.description,
          createdBy: ctx.user.id,
          logo: "",
          image: "",
        })
        .returning();
    }),
  updateLesson: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        logo: z.string().min(1).optional(),
        image: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.lesson)
        .set({
          name: input.name,
          description: input.description,
          logo: input.logo,
          image: input.image,
        })
        .where(eq(schema.lesson.id, input.id));
    }),
  deleteLesson: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(schema.lesson).where(eq(schema.lesson.id, input.id));
    }),
  chapters: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.page.findMany({
        where: eq(schema.page.lessonId, input.id),
        columns: {
          createdAt: true,
          createdBy: true,
          description: true,
          id: true,
          lessonId: true,
          name: true,
          type: true,
          image: true,
          logo: true,
          updatedAt: true,
          video: true,
        },
        with: {
          quizzes: {
            columns: {
              name: true,
              description: true,
              pageId: true,
              id: true,
            },
            with: {
              questions: {
                columns: {
                  answer: true,
                  id: true,
                  question: true,
                  quizId: true,
                },
                with: {
                  options: {
                    columns: {
                      id: true,
                      option: true,
                      quizQuestionId: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),
  chapterById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.page.findFirst({
        where: eq(schema.page.id, input.id),
        columns: {
          createdAt: true,
          createdBy: true,
          description: true,
          id: true,
          lessonId: true,
          name: true,
          type: true,
          image: true,
          logo: true,
          updatedAt: true,
          video: true,
        },
        with: {
          quizzes: {
            columns: {
              name: true,
              description: true,
              pageId: true,
              id: true,
            },
            with: {
              questions: {
                columns: {
                  answer: true,
                  id: true,
                  question: true,
                  quizId: true,
                },
                with: {
                  options: {
                    columns: {
                      id: true,
                      option: true,
                      quizQuestionId: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
    }),
  createChapter: adminProcedure
    .input(
      z.object({
        lessonId: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
        type: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create a course
      return ctx.db
        .insert(schema.page)
        .values({
          lessonId: input.lessonId,
          name: input.name,
          description: input.description,
          createdBy: ctx.user.id,
          logo: "",
          image: "",
          type: input.type,
        })
        .returning();
    }),
  updateChapter: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        logo: z.string().min(1).optional(),
        image: z.string().min(1).optional(),
        video: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.page)
        .set({
          name: input.name,
          description: input.description,
          logo: input.logo,
          image: input.image,
          video: input.video,
        })
        .where(eq(schema.page.id, input.id));
    }),
  removeVideo: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.page)
        .set({
          video: "",
        })
        .where(eq(schema.page.id, input.id));
    }),
  removeImageFromCourse: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.course)
        .set({
          image: "",
        })
        .where(eq(schema.course.id, input.id));
    }),
  deleteChapter: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(schema.page).where(eq(schema.page.id, input.id));
    }),
  quizById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.quiz.findMany({
        where: eq(schema.quiz.pageId, input.id),
      });
    }),
  createQuiz: adminProcedure
    .input(
      z.object({
        pageId: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create a course
      return ctx.db
        .insert(schema.quiz)
        .values({
          name: input.name,
          description: input.description,
          createdBy: ctx.user.id,
          logo: "",
          image: "",
          pageId: input.pageId,
        })
        .returning();
    }),
  updateQuiz: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().min(1).optional(),
        logo: z.string().min(1).optional(),
        image: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.quiz)
        .set({
          name: input.name,
          description: input.description,
          logo: input.logo,
          image: input.image,
        })
        .where(eq(schema.quiz.id, input.id));
    }),
  deleteQuiz: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.delete(schema.quiz).where(eq(schema.quiz.id, input.id));
    }),
  questionsById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.quizQuestion.findMany({
        where: eq(schema.quizQuestion.quizId, input.id),
        with: {
          quiz: true,
        },
      });
    }),
  createQuestion: adminProcedure
    .input(
      z.object({
        quizId: z.string().min(1),
        question: z.string().min(1),
        answer: z.string().min(1),
        options: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create a course
      return ctx.db
        .insert(schema.quizQuestion)
        .values({
          question: input.question,
          answer: input.answer,
          quizId: input.quizId,
        })
        .returning();
    }),
  updateQuestion: adminProcedure
    .input(
      z.object({
        id: z.string(),
        question: z.string().min(1).optional(),
        answer: z.string().min(1).optional(),
        options: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.quizQuestion)
        .set({
          question: input.question,
          answer: input.answer,
        })
        .where(eq(schema.quizQuestion.id, input.id));
    }),
  deleteQuestion: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .delete(schema.quizQuestion)
        .where(eq(schema.quizQuestion.id, input.id));
    }),
  optionsById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.quizOptions.findMany({
        where: eq(schema.quizOptions.quizQuestionId, input.id),
        with: {
          quizQuestion: true,
        },
      });
    }),
  createOption: adminProcedure
    .input(
      z.object({
        quizQuestionId: z.string().min(1),
        option: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create a course
      return ctx.db
        .insert(schema.quizOptions)
        .values({
          option: input.option,
          quizQuestionId: input.quizQuestionId,
        })
        .returning();
    }),
  updateOption: adminProcedure
    .input(
      z.object({
        id: z.string(),
        option: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.quizOptions)
        .set({
          option: input.option,
        })
        .where(eq(schema.quizOptions.id, input.id));
    }),
  deleteOption: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .delete(schema.quizOptions)
        .where(eq(schema.quizOptions.id, input.id));
    }),
  answersById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.quizAnswer.findMany({
        where: eq(schema.quizAnswer.quizQuestionId, input.id),
        with: {
          quizQuestion: true,
        },
      });
    }),
  createAnswer: adminProcedure
    .input(
      z.object({
        quizQuestionId: z.string().min(1),
        answer: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create a course
      return ctx.db
        .insert(schema.quizAnswer)
        .values({
          answer: input.answer,
          quizQuestionId: input.quizQuestionId,
        })
        .returning();
    }),
  updateAnswer: adminProcedure
    .input(
      z.object({
        id: z.string(),
        answer: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.quizAnswer)
        .set({
          answer: input.answer,
        })
        .where(eq(schema.quizAnswer.id, input.id));
    }),
  deleteAnswer: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .delete(schema.quizAnswer)
        .where(eq(schema.quizAnswer.id, input.id));
    }),
  answerUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.quizAnswerUser.findMany({
        where: eq(schema.quizAnswerUser.quizAnswerId, input.id),
        with: {
          quizAnswer: true,
          user: true,
        },
      });
    }),
  createAnswerUser: adminProcedure
    .input(
      z.object({
        quizAnswerId: z.string().min(1),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create a course
      return ctx.db
        .insert(schema.quizAnswerUser)
        .values({
          userId: input.userId,
          quizAnswerId: input.quizAnswerId,
        })
        .returning();
    }),
  updateAnswerUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.quizAnswerUser)
        .set({
          userId: input.userId,
        })
        .where(eq(schema.quizAnswerUser.id, input.id));
    }),
  deleteAnswerUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .delete(schema.quizAnswerUser)
        .where(eq(schema.quizAnswerUser.id, input.id));
    }),
  courseUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.query.courseUser.findMany({
        where: eq(schema.courseUser.courseId, input.id),
        with: {
          course: true,
          user: true,
        },
      });
    }),
  createCourseUser: adminProcedure
    .input(
      z.object({
        courseId: z.string().min(1),
        userId: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Create a course
      return ctx.db
        .insert(schema.courseUser)
        .values({
          userId: input.userId,
          courseId: input.courseId,
        })
        .returning();
    }),
  updateCourseUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .update(schema.courseUser)
        .set({
          userId: input.userId,
        })
        .where(eq(schema.courseUser.id, input.id));
    }),
  deleteCourseUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db
        .delete(schema.courseUser)
        .where(eq(schema.courseUser.id, input.id));
    }),
});
