DELIMITER |
CREATE TRIGGER nonull 
BEFORE INSERT ON customer 
FOR EACH ROW 
BEGIN 
    IF new.summary IS NULL THEN
        SET new.summary = LPAD(new.content, 149, '…');
    END IF;
END|
DELIMITER ;