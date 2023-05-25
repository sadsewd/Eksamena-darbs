/*Populārākās preces*/
select produkti.id, produkti.nosaukums, produkti.attels, kategorijas.nosaukums 
from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id inner join kategorijas on produkti.Kategorijas_id = kategorijas.id 
order by produkta_info.pirkumu_skaits desc 
limit 6;
/*Jaunākās preces*/
select produkti.id, produkti.nosaukums, produkti.attels, kategorijas.nosaukums 
from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id inner join kategorijas on produkti.Kategorijas_id = kategorijas.id 
order by produkta_info.pievienosanas_datums desc 
limit 6;
