-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "category" TEXT NOT NULL,
    "favorite" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
