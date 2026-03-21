program BubbleSort;

uses crt;

var
  tab: array[1..50] of integer;

{ generowanie tablicy z losowymi liczbami }
procedure Losuj;
var
  i: integer;
begin
  randomize;
  for i := 1 to 50 do
    tab[i] := random(101);
end;

{ pomocnicza procedura do wypisywania}
procedure Wypisz;
var
  i: integer;
begin
  for i := 1 to 50 do
    write(tab[i], ' ');
  writeln;
end;

begin
    writeln('Losowe liczby:');
    Losuj;
    Wypisz;
end.