BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Trade] (
    [trade_id] INT NOT NULL IDENTITY(1,1),
    [trade_name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Trade_pkey] PRIMARY KEY CLUSTERED ([trade_id]),
    CONSTRAINT [Trade_trade_name_key] UNIQUE NONCLUSTERED ([trade_name])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [role_id] INT NOT NULL IDENTITY(1,1),
    [role_name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([role_id]),
    CONSTRAINT [Role_role_name_key] UNIQUE NONCLUSTERED ([role_name])
);

-- CreateTable
CREATE TABLE [dbo].[Account] (
    [account_id] INT NOT NULL IDENTITY(1,1),
    [account_email] NVARCHAR(1000) NOT NULL,
    [account_password] NVARCHAR(1000) NOT NULL,
    [account_name] NVARCHAR(1000) NOT NULL,
    [account_establishment_id] INT,
    [account_role_id] INT NOT NULL,
    [account_trade_id] INT,
    [account_hourly_rate] INT,
    [account_hourly_overtime_rate] INT,
    CONSTRAINT [Account_pkey] PRIMARY KEY CLUSTERED ([account_id]),
    CONSTRAINT [Account_account_email_key] UNIQUE NONCLUSTERED ([account_email])
);

-- CreateTable
CREATE TABLE [dbo].[Establishment] (
    [establishment_id] INT NOT NULL IDENTITY(1,1),
    [establishment_name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Establishment_pkey] PRIMARY KEY CLUSTERED ([establishment_id])
);

-- CreateTable
CREATE TABLE [dbo].[Timesheet] (
    [timesheet_id] INT NOT NULL IDENTITY(1,1),
    [timesheet_name] NVARCHAR(1000) NOT NULL,
    [timesheet_account_id] INT NOT NULL,
    [timesheet_start_date] DATETIME2 NOT NULL,
    [timesheet_end_date] DATETIME2 NOT NULL,
    CONSTRAINT [Timesheet_pkey] PRIMARY KEY CLUSTERED ([timesheet_id])
);

-- CreateTable
CREATE TABLE [dbo].[Job] (
    [job_id] INT NOT NULL IDENTITY(1,1),
    [job_display_name] NVARCHAR(1000) NOT NULL,
    [job_location] INT NOT NULL,
    [job_start_time] DATETIME2 NOT NULL,
    [job_end_time] DATETIME2 NOT NULL,
    [job_notes] NVARCHAR(1000),
    [job_standard_hours_worked] INT,
    [job_overtime_hours_worked] INT,
    [job_timesheet_id] INT,
    CONSTRAINT [Job_pkey] PRIMARY KEY CLUSTERED ([job_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_account_establishment_id_fkey] FOREIGN KEY ([account_establishment_id]) REFERENCES [dbo].[Establishment]([establishment_id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_account_role_id_fkey] FOREIGN KEY ([account_role_id]) REFERENCES [dbo].[Role]([role_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Account] ADD CONSTRAINT [Account_account_trade_id_fkey] FOREIGN KEY ([account_trade_id]) REFERENCES [dbo].[Trade]([trade_id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Timesheet] ADD CONSTRAINT [Timesheet_timesheet_account_id_fkey] FOREIGN KEY ([timesheet_account_id]) REFERENCES [dbo].[Account]([account_id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Job] ADD CONSTRAINT [Job_job_location_fkey] FOREIGN KEY ([job_location]) REFERENCES [dbo].[Establishment]([establishment_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Job] ADD CONSTRAINT [Job_job_timesheet_id_fkey] FOREIGN KEY ([job_timesheet_id]) REFERENCES [dbo].[Timesheet]([timesheet_id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
