UPDATE dbo.roleTable (RoleID, RoleName, RoleDescription)
 VALUES (2, 'person', 'a person');
 
 select * from dbo.roleTable;
 
 insert into dbo.opportunitytable(Title,Description,TotalSeats)
 values ('opportunity alpha','an opportunity object.. more description',5);
 
 select * from dbo.opportunitytable;