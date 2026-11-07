import type {
  PortalRole,
  QuestionKind,
  UpdateStatus,
} from "@/lib/sentrasera/schemas"

type Fk<
  Name extends string,
  Column extends string,
  Relation extends string,
  Referenced extends string,
> = {
  foreignKeyName: Name
  columns: [Column]
  isOneToOne: false
  referencedRelation: Relation
  referencedColumns: [Referenced]
}

type CategoryFk<Name extends string> = Fk<
  Name,
  "category_id",
  "sentrasera_categories",
  "id"
>

type ProfileFk<Name extends string, Column extends string> = Fk<
  Name,
  Column,
  "sentrasera_profiles",
  "user_id"
>

type Table<Row, Insert, Relationships extends unknown[] = []> = {
  Row: Row
  Insert: Insert
  Update: Partial<Insert>
  Relationships: Relationships
}

type ProfileRow = {
  user_id: string
  role: PortalRole
  email: string
  contact_name: string
  organization: string | null
  is_active: boolean
  last_login_at: string | null
  created_at: string
}

type CategoryRow = {
  id: string
  name: string
  sort_order: number
  created_at: string
}

type QuestionRow = {
  id: string
  category_id: string
  prompt: string
  kind: QuestionKind
  choices: string[]
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

type AnswerRow = {
  question_id: string
  client_id: string
  value: string
  created_at: string
  updated_at: string
}

type FeedbackRow = {
  id: string
  client_id: string
  category_id: string | null
  body: string
  response: string | null
  responded_at: string | null
  responded_by: string | null
  created_at: string
}

type UpdateRow = {
  id: string
  title: string
  description: string | null
  scheduled_for: string
  status: UpdateStatus
  category_id: string | null
  created_at: string
  updated_at: string
}

export type SentraseraDatabase = {
  public: {
    Tables: {
      sentrasera_profiles: Table<
        ProfileRow,
        Pick<ProfileRow, "user_id" | "role" | "email" | "contact_name"> &
          Partial<ProfileRow>
      >
      sentrasera_categories: Table<
        CategoryRow,
        Pick<CategoryRow, "name"> & Partial<CategoryRow>
      >
      sentrasera_questions: Table<
        QuestionRow,
        Pick<QuestionRow, "category_id" | "prompt"> & Partial<QuestionRow>,
        [CategoryFk<"sentrasera_questions_category_id_fkey">]
      >
      sentrasera_answers: Table<
        AnswerRow,
        Pick<AnswerRow, "question_id" | "client_id" | "value"> &
          Partial<AnswerRow>,
        [
          ProfileFk<"sentrasera_answers_client_id_fkey", "client_id">,
          Fk<
            "sentrasera_answers_question_id_fkey",
            "question_id",
            "sentrasera_questions",
            "id"
          >,
        ]
      >
      sentrasera_feedback: Table<
        FeedbackRow,
        Pick<FeedbackRow, "client_id" | "body"> & Partial<FeedbackRow>,
        [
          CategoryFk<"sentrasera_feedback_category_id_fkey">,
          ProfileFk<"sentrasera_feedback_client_id_fkey", "client_id">,
          ProfileFk<"sentrasera_feedback_responded_by_fkey", "responded_by">,
        ]
      >
      sentrasera_updates: Table<
        UpdateRow,
        Pick<UpdateRow, "title" | "scheduled_for"> & Partial<UpdateRow>,
        [CategoryFk<"sentrasera_updates_category_id_fkey">]
      >
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
