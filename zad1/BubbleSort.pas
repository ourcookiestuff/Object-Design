program BubbleSort;

uses crt;

var
  tab: array[1..50] of integer;
  n: integer;

{ generowanie tablicy z losowymi liczbami }
procedure Losuj(ile, od_, do_: integer);
var
  i: integer;
begin
  n := ile;
  randomize;
  for i := 1 to ile do
    tab[i] := random(do_ - od_ + 1) + od_;
end;

{ sortowanie bąbelkowe }
procedure Sortuj;
var
  i, j, temp: integer;
begin
  for i := 1 to n - 1 do
    for j := 1 to n - i do
      if tab[j] > tab[j + 1] then
      begin
        temp := tab[j];
        tab[j] := tab[j + 1];
        tab[j + 1] := temp;
      end;
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

{ TEST 1: czy liczby są w zakresie }
procedure TestZakres;
var 
  i: integer;
  ok: boolean;
begin
  Losuj(50, 1, 10);
  ok := true;
  for i := 1 to 50 do
    if (tab[i] < 1) or (tab[i] > 10) then 
      ok := false;

  if ok then writeln('TestZakresu: OK')
  else writeln('TestZakresu: FAIL');
end;

{ TEST 2: czy liczby są posortowane }
procedure TestSortowania;
var
  i: integer;
  ok: boolean;
begin
  Losuj(50, 0, 100);
  Sortuj;

  ok := true;
  for i := 1 to 49 do
    if tab[i] > tab[i+1] then
      ok := false;

  if ok then writeln('TestSortowania OK')
  else writeln('TestSortowania FAIL');
end;

{ TEST 3: jeden element }
procedure TestJedenElement;
begin
  tab[1] := 5;
  Sortuj;

  if tab[1] = 5 then writeln('TestJedenElement OK')
  else writeln('TestJedenElement FAIL');
end;

{ TEST 4: już posortowane }
procedure TestPosortowane;
var
  i: integer;
  ok: boolean;
begin
  for i := 1 to 50 do
    tab[i] := i;

  Sortuj;

  ok := true;
  for i := 1 to 49 do
    if tab[i] > tab[i+1] then
      ok := false;

  if ok then writeln('TestPosortowane OK')
  else writeln('TestPosortowane FAIL');
end;

{ TEST 5: wszystkie elementy takie same }
procedure TestTeSame;
var
  i: integer;
  ok: boolean;
begin
  for i := 1 to 50 do
    tab[i] := 7;

  Sortuj;

  ok := true;
  for i := 1 to 50 do
    if tab[i] <> 7 then
      ok := false;

  if ok then writeln('TestTeSame OK')
  else writeln('TestTeSame FAIL');
end;

begin
    writeln('--- TESTY ---');
    TestZakres;
    TestSortowania;
    TestJedenElement;
    TestPosortowane;
    TestTeSame;

    writeln;
    writeln('--- PROGRAM ---');

    writeln('Losowe liczby:');
    Losuj(50, 1, 48);
    Wypisz;

    writeln('Posortowane liczby:');
    Sortuj;
    Wypisz;
end.