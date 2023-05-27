
/*Populārākās preces*/
select produkti.id, produkti.nosaukums, produkti.attels, kategorijas.nosaukums as kategorija
from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id inner join kategorijas on produkti.Kategorijas_id = kategorijas.id 
order by produkta_info.pirkumu_skaits desc 
limit 6;

/*Jaunākās preces*/
select produkti.id, produkti.nosaukums, produkti.attels, kategorijas.nosaukums as kategorija
from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id inner join kategorijas on produkti.Kategorijas_id = kategorijas.id 
order by produkta_info.pievienosanas_datums desc 
limit 6;

/*Preces apraksts*/
select produkti.id, produkti.nosaukums,produkti.apraksts, produkti.attels, produkta_info.cena, produkta_info.daudzums_noliktava
from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id 
inner join kategorijas on produkti.Kategorijas_id = kategorijas.id 
inner join produkta_info_has_variacijas_dati on produkta_info.id = produkta_info_has_variacijas_dati.Produkta_info_id 
inner join variacijas_dati on produkta_info_has_variacijas_dati.Variacijas_dati_id = variacijas_dati.id 
inner join variacijas on variacijas.id = variacijas_dati.Variacijas_id
where produkti.id = 1
limit 1;

/*Preces dati*/
select  variacijas.nosaukums as variacijas_nos, variacijas_dati.vertiba as variacijas_vert
from produkti inner join produkta_info on produkti.id = produkta_info.Produkti_id 
inner join kategorijas on produkti.Kategorijas_id = kategorijas.id 
inner join produkta_info_has_variacijas_dati on produkta_info.id = produkta_info_has_variacijas_dati.Produkta_info_id 
inner join variacijas_dati on produkta_info_has_variacijas_dati.Variacijas_dati_id = variacijas_dati.id 
inner join variacijas on variacijas.id = variacijas_dati.Variacijas_id
where produkti.id = 2
