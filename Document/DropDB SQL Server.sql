-- Code Drop DB while that DB in use

USE master;
ALTER DATABASE [TaskManagement] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
go
DROP DATABASE [TaskManagement];

