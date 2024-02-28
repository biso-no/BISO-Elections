import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", [
  "user",
  "admin",
  "election_administrator",
  "election_participant",
  "non_participant",
]);

export const campus = pgEnum("campus", [
  "Bergen",
  "Oslo",
  "Stavanger",
  "Trondheim",
  "National",
]);

export const electionSessionStatus = pgEnum("election_session_status", [
  "not_started",
  "in_progress",
  "completed",
]);

export const ticketType = pgEnum("ticket_type", [
  "free",
  "paid",
  "membership",
  "non_member",
]);

export const ticketStatus = pgEnum("ticket_status", [
  "available",
  "sold",
  "reserved",
  "unavailable",
]);

export const ticketRefundableAmountType = pgEnum(
  "ticket_refundable_amount_type",
  ["fixed", "percentage"],
);

export const eventStatus = pgEnum("event_status", [
  "draft",
  "published",
  "cancelled",
]);

export const eventType = pgEnum("event_type", [
  "public",
  "private",
  "members_only",
]);

export const positionType = pgEnum("position_type", [
  "position",
  "statute_change",
]);

export const onlineStatus = pgEnum("online_status", ["online", "offline"]);

export const paymentProvider = pgEnum("payment_provider", ["stripe", "vipps"]);

export const paymentType = pgEnum("payment_type", ["card", "mobile"]);

export const paymentStatus = pgEnum("payment_status", [
  "pending",
  "paid",
  "failed",
  "cancelled",
  "refunded",
]);

export const profile = pgTable("profile", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: varchar("name", { length: 256 }).notNull(),
  image: varchar("image", { length: 256 }),
  email: varchar("email", { length: 256 }),
  address: varchar("address", { length: 256 }),
  city: varchar("city", { length: 256 }),
  zip: varchar("zip", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  bankAccount: varchar("bank_account", { length: 256 }),
  userRole: userRole("user_role").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const post = pgTable("post", {
  id: varchar("id", { length: 256 }).primaryKey(),
  title: varchar("name", { length: 256 }).notNull(),
  content: varchar("content", { length: 256 }).notNull(),
  authorId: uuid("author_id")
    .notNull()
    .references(() => profile.id),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const postRelations = relations(post, ({ one }) => ({
  author: one(profile, { fields: [post.authorId], references: [profile.id] }),
}));

export const profileRelations = relations(profile, ({ many }) => ({
  posts: many(post),
  elections: many(election),
  expenses: many(expense),
  electionAdmins: many(electionAdmin),
  chapterProgress: many(chapterProgress),
}));

export const election = pgTable("election", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: varchar("name", { length: 256 }).notNull(),
  date: timestamp("date")
    .notNull()
    .$default(() => sql`CURRENT_TIMESTAMP`),
  campus: campus("campus").notNull(),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => profile.id, { onDelete: "cascade" }),
});

export const electionRelations = relations(election, ({ many, one }) => ({
  sessions: many(electionSession),
  voters: many(electionVoter),
  createdBy: one(profile, {
    fields: [election.createdBy],
    references: [profile.id],
  }),
}));

export const electionSession = pgTable("election_session", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: varchar("name", { length: 256 }).notNull(),
  electionId: varchar("election_id", { length: 256 })
    .notNull()
    .references(() => election.id, { onDelete: "cascade" }),
  status: electionSessionStatus("status").notNull(),
  startedAt: timestamp("started_at"),
  endedAt: timestamp("ended_at"),
});

export const electionSessionRelations = relations(
  electionSession,
  ({ many, one }) => ({
    // existing relations...
    positions: many(electionPosition),
    votes: many(electionVote),
    election: one(election, {
      fields: [electionSession.electionId],
      references: [election.id],
    }),
  }),
);

export const electionPosition = pgTable("election_position", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: varchar("name", { length: 256 }).notNull(),
  type: positionType("type").notNull(),
  maxSelections: integer("max_selections"),
  withAbstain: boolean("with_abstain"),
  sessionId: varchar("session_id", { length: 256 }).references(
    () => electionSession.id,
    { onDelete: "cascade" },
  ),
});

export const positionsRelations = relations(
  electionPosition,
  ({ many, one }) => ({
    session: one(electionSession, {
      fields: [electionPosition.sessionId],
      references: [electionSession.id],
    }),
    candidates: many(electionCandidate),
  }),
);

export const electionCandidate = pgTable("election_candidate", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  electionPositionId: uuid("election_position_id")
    .notNull()
    .references(() => electionPosition.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 256 }).notNull(),
  priority: integer("priority").notNull(),
});

export const electionCandidateRelations = relations(
  electionCandidate,
  ({ one, many }) => ({
    position: one(electionPosition, {
      fields: [electionCandidate.electionPositionId],
      references: [electionPosition.id],
    }),
    votes: many(electionVote),
  }),
);

export const electionVoter = pgTable("election_voter", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  electionId: varchar("election_id", { length: 256 })
    .notNull()
    .references(() => election.id, { onDelete: "cascade" }),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profile.id, { onDelete: "cascade" }),
  vote_weight: integer("vote_weight").notNull(),
});

export const electionVoterRelations = relations(
  electionVoter,
  ({ one, many }) => ({
    profile: one(profile, {
      fields: [electionVoter.profileId],
      references: [profile.id],
    }),
    election: one(election, {
      fields: [electionVoter.electionId],
      references: [election.id],
    }),
    votes: many(electionVote),
  }),
);

export const electionVote = pgTable("election_vote", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profile.id),
  sessionId: varchar("session_id", { length: 256 }).references(
    () => electionSession.id,
    { onDelete: "cascade" },
  ),
  candidateId: varchar("candidate_id", { length: 256 }).references(
    () => electionCandidate.id,
    { onDelete: "cascade" },
  ),
  weight: integer("weight").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const electionVoteRelations = relations(electionVote, ({ one }) => ({
  profile: one(profile, {
    fields: [electionVote.profileId],
    references: [profile.id],
  }),
  candidate: one(electionCandidate, {
    fields: [electionVote.candidateId],
    references: [electionCandidate.id],
  }),
  session: one(electionSession, {
    fields: [electionVote.sessionId],
    references: [electionSession.id],
  }),
  voter: one(electionVoter, {
    fields: [electionVote.profileId],
    references: [electionVoter.profileId],
  }),
}));

export const electionAdmin = pgTable("election_admin", {
  id: varchar("id", { length: 256 })
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  electionId: varchar("election_id", { length: 256 })
    .notNull()
    .references(() => election.id),
  userId: uuid("user_id").references(() => profile.id),
});

export const expenseAttachment = pgTable("expense_attachment", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  expenseId: uuid("expense_id")
    .notNull()
    .references(() => expense.id), // Foreign key to expense
  description: varchar("description", { length: 256 }),
  value: integer("value").notNull(),
  date: timestamp("date").notNull(),
  url: varchar("url", { length: 256 }).notNull(),
});

export const expense = pgTable("expense", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: varchar("name", { length: 256 }).notNull(),
  profileId: uuid("profile_id")
    .notNull()
    .references(() => profile.id),
  description: varchar("description", { length: 256 }),
  totalAmount: integer("total_amount").notNull(),
  status: varchar("status", { length: 256 }).notNull(),
  invoiceNumber: varchar("invoice_number", { length: 256 }),
  invoiceDate: timestamp("invoice_date"),
  department: varchar("department", { length: 256 }),
  campus: varchar("campus", { length: 256 }),
  organization: varchar("organization", { length: 256 }),
  address: varchar("address", { length: 256 }),
  zip: varchar("zip", { length: 256 }),
  city: varchar("city", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const expenseRelations = relations(expense, ({ many, one }) => ({
  attachments: many(expenseAttachment),
  profile: one(profile, {
    fields: [expense.profileId],
    references: [profile.id],
  }),
}));

export const expenseAttachmentRelations = relations(
  expenseAttachment,
  ({ one }) => ({
    expense: one(expense, {
      fields: [expenseAttachment.expenseId],
      references: [expense.id],
    }),
  }),
);
export const course = pgTable("course", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  image: varchar("image", { length: 256 }),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => profile.id, { onDelete: "restrict" }),
  logo: varchar("logo", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const courseRelations = relations(course, ({ many, one }) => ({
  createdBy: one(profile, {
    fields: [course.createdBy],
    references: [profile.id],
  }),
  lessons: many(lesson),
}));

export const lesson = pgTable("lesson", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  image: varchar("image", { length: 256 }),
  courseId: uuid("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "cascade" }),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => profile.id, { onDelete: "restrict" }),
  logo: varchar("logo", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const lessonRelations = relations(lesson, ({ many, one }) => ({
  createdBy: one(profile, {
    fields: [lesson.createdBy],
    references: [profile.id],
  }),
  pages: many(page),
  course: one(course, {
    fields: [lesson.courseId],
    references: [course.id],
  }),
}));

export const page = pgTable("page", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  image: varchar("image", { length: 256 }),
  type: varchar("type", { length: 256 }).notNull(),
  video: varchar("video", { length: 256 }),
  lessonId: uuid("lesson_id")
    .notNull()
    .references(() => lesson.id, { onDelete: "cascade" }),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => profile.id, { onDelete: "restrict" }),
  logo: varchar("logo", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const pageRelations = relations(page, ({ many, one }) => ({
  createdBy: one(profile, {
    fields: [page.createdBy],
    references: [profile.id],
  }),
  lesson: one(lesson, {
    fields: [page.lessonId],
    references: [lesson.id],
  }),
  quizzes: many(quiz),
  chapterProgress: many(chapterProgress),
}));

export const quiz = pgTable("quiz", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  image: varchar("image", { length: 256 }),
  pageId: uuid("page_id")
    .notNull()
    .references(() => page.id, { onDelete: "restrict" }),
  createdBy: uuid("created_by")
    .notNull()
    .references(() => profile.id, { onDelete: "restrict" }),
  logo: varchar("logo", { length: 256 }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at"),
});

export const quizRelations = relations(quiz, ({ many, one }) => ({
  createdBy: one(profile, {
    fields: [quiz.createdBy],
    references: [profile.id],
  }),
  questions: many(quizQuestion),
  page: one(page, {
    fields: [quiz.pageId],
    references: [page.id],
  }),
}));

export const quizQuestion = pgTable("quiz_question", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  question: varchar("question", { length: 256 }).notNull(),
  answer: varchar("answer", { length: 256 }).notNull(),
  quizId: uuid("quiz_id")
    .notNull()
    .references(() => quiz.id, { onDelete: "restrict" }),
});

export const quizQuestionRelations = relations(
  quizQuestion,
  ({ many, one }) => ({
    quiz: one(quiz, {
      fields: [quizQuestion.quizId],
      references: [quiz.id],
    }),
    answers: many(quizAnswer),
    options: many(quizOptions),
  }),
);

export const quizOptions = pgTable("quiz_options", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  option: varchar("option", { length: 256 }).notNull(),
  quizQuestionId: uuid("quiz_question_id")
    .notNull()
    .references(() => quizQuestion.id, { onDelete: "restrict" }),
});

export const quizOptionsRelations = relations(quizOptions, ({ one }) => ({
  quizQuestion: one(quizQuestion, {
    fields: [quizOptions.quizQuestionId],
    references: [quizQuestion.id],
  }),
}));

export const quizAnswer = pgTable("quiz_answer", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  answer: varchar("answer", { length: 256 }).notNull(),
  quizQuestionId: uuid("quiz_question_id")
    .notNull()
    .references(() => quizQuestion.id, { onDelete: "restrict" }),
});

export const quizAnswerRelations = relations(quizAnswer, ({ many, one }) => ({
  quizQuestion: one(quizQuestion, {
    fields: [quizAnswer.quizQuestionId],
    references: [quizQuestion.id],
  }),
  users: many(quizAnswerUser),
}));

export const quizAnswerUser = pgTable("quiz_answer_user", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  quizAnswerId: uuid("quiz_answer_id")
    .notNull()
    .references(() => quizAnswer.id, { onDelete: "restrict" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => profile.id, { onDelete: "restrict" }),
});

export const quizAnswerUserRelations = relations(quizAnswerUser, ({ one }) => ({
  quizAnswer: one(quizAnswer, {
    fields: [quizAnswerUser.quizAnswerId],
    references: [quizAnswer.id],
  }),
  user: one(profile, {
    fields: [quizAnswerUser.userId],
    references: [profile.id],
  }),
}));

export const courseUser = pgTable("course_user", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  courseId: uuid("course_id")
    .notNull()
    .references(() => course.id, { onDelete: "restrict" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => profile.id, { onDelete: "restrict" }),
});

export const courseUserRelations = relations(courseUser, ({ one }) => ({
  course: one(course, {
    fields: [courseUser.courseId],
    references: [course.id],
  }),
  user: one(profile, {
    fields: [courseUser.userId],
    references: [profile.id],
  }),
}));

export const chapterProgress = pgTable("chapter_progress", {
  id: uuid("id")
    .primaryKey()
    .default(sql`uuid_generate_v4()`),
  chapterId: uuid("chapter_id")
    .notNull()
    .references(() => page.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => profile.id, { onDelete: "restrict" }),
  progress: integer("progress").notNull(),
});

export const chapterProgressRelations = relations(
  chapterProgress,
  ({ one }) => ({
    chapter: one(page, {
      fields: [chapterProgress.chapterId],
      references: [page.id],
    }),
    user: one(profile, {
      fields: [chapterProgress.userId],
      references: [profile.id],
    }),
  }),
);
