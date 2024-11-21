DROP TABLE IF EXISTS `myLog`;
DROP TABLE IF EXISTS `myPrescriptions`;
DROP TABLE IF EXISTS `myPatients`;
DROP TABLE IF EXISTS `PillLog`;
DROP TABLE IF EXISTS `Prescription`;
DROP TABLE IF EXISTS `Medication`;
DROP TABLE IF EXISTS `Physician`;
DROP TABLE IF EXISTS `Patient`;

CREATE TABLE `Patient` (
    `Patient_ID` int AUTO_INCREMENT PRIMARY KEY,
    `First_Name` varchar(100) NOT NULL,
    `Last_Name` varchar(100) NOT NULL,
    `Address` nvarchar(100),
    `PhoneNumber` nvarchar(15),
    `Email` nvarchar(100) UNIQUE,
    `Gender` ENUM('Male', 'Female', 'Other') NOT NULL,
    `Date_of_Birth` date NOT NULL,
    `Password` varchar(100) NOT NULL
);

CREATE TABLE `Physician` (
    `Physician_ID` int AUTO_INCREMENT PRIMARY KEY,
    `First_Name` varchar(100) NOT NULL,
    `Last_Name` varchar(100) NOT NULL,
    `Address` nvarchar(100),
    `PhoneNumber` nvarchar(15),
    `Email` nvarchar(100) UNIQUE,
    `Date_of_Birth` date NOT NULL,
    `License_Number` varchar(100) NOT NULL, -- Fixed typo
    `Password` varchar(100) NOT NULL
);

CREATE TABLE `Medication` (
    `Medication_ID` int AUTO_INCREMENT PRIMARY KEY,
    `Generic_Name` varchar(100) NOT NULL,
    `Brand_Name` varchar(100),
    `Form` ENUM(
        'TAB', 'CAP', 'ER', 'CR', 'SR', 'DR', 'ODT', 'CHEW', 
        'SOL', 'SUSP', 'ELIX', 'SYR', 'LOZ', 'POW', 'IM', 
        'IV', 'SC', 'SubQ', 'ID', 'IVP', 'IVPB', 'CRM', 
        'OINT', 'LOTION', 'PATCH', 'POWDER', 'PASTE', 'MDI', 
        'DPI', 'NEB', 'INH', 'EYE DROP', 'EAR DROP', 'SUPP', 
        'ENEMA', 'GEL', 'OVULE', 'BUC', 'SL', 'PR', 'PV', 'TOP', 'TD'
    ) NOT NULL
);

CREATE TABLE `Prescription` (
    `Prescription_ID` int AUTO_INCREMENT PRIMARY KEY,
    `Notes` text,
    `Start_Date` date NOT NULL,
    `End_Date` date,
    `Frequency` int NOT NULL,
    `Quantity` int NOT NULL,
    `Medication_ID` int NOT NULL,
    FOREIGN KEY (`Medication_ID`) REFERENCES `Medication` (`Medication_ID`)
);

CREATE TABLE `PillLog` (
    `Log_ID` int AUTO_INCREMENT PRIMARY KEY,
    `Timestamp` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `myPatients` (
    `Physician_ID` int NOT NULL,
    `Patient_ID` int NOT NULL,
    PRIMARY KEY (`Physician_ID`, `Patient_ID`),
    FOREIGN KEY (`Physician_ID`) REFERENCES `Physician` (`Physician_ID`),
    FOREIGN KEY (`Patient_ID`) REFERENCES `Patient` (`Patient_ID`)
);

CREATE TABLE `myPrescriptions` (
    `Prescription_ID` int NOT NULL,
    `Patient_ID` int NOT NULL,
    PRIMARY KEY (`Prescription_ID`, `Patient_ID`),
    FOREIGN KEY (`Prescription_ID`) REFERENCES `Prescription` (`Prescription_ID`),
    FOREIGN KEY (`Patient_ID`) REFERENCES `Patient` (`Patient_ID`)
);

CREATE TABLE `myLog` (
    `Log_ID` int NOT NULL,
    `Prescription_ID` int NOT NULL,
    PRIMARY KEY (`Log_ID`, `Prescription_ID`),
    FOREIGN KEY (`Log_ID`) REFERENCES `PillLog` (`Log_ID`),
    FOREIGN KEY (`Prescription_ID`) REFERENCES `Prescription` (`Prescription_ID`)
);