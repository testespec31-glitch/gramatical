CREATE TABLE "partidas" (
	"id" serial PRIMARY KEY,
	"apelido" text NOT NULL,
	"modo" text NOT NULL,
	"tema" text,
	"pontos" integer NOT NULL,
	"acertos" integer NOT NULL,
	"total" integer NOT NULL,
	"melhor_sequencia" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now()
);
