defmodule Day03.Part1 do
  def solve(input) do
    Regex.scan(~r/mul\((\d+),(\d+)\)/, input)
    |> Enum.map(&Enum.drop(&1, 1))
    |> Enum.reduce(0, fn [a, b], acc ->
      acc + (String.to_integer(a) * String.to_integer(b))
    end)
  end
end

defmodule Day03.Part2 do
  def solve(input) do
    input
    |> String.split("", trim: true)
    |> Enum.reduce(["", true, ""], fn char, [buf, is_enabled, valid_parts] ->
      buf = buf <> char
      cond do
        String.ends_with?(buf, "don't()") -> ["", false, valid_parts]
        String.ends_with?(buf, "do()") -> ["", true, valid_parts]
        is_enabled -> [buf, is_enabled, valid_parts <> char]
        true -> [buf, is_enabled, valid_parts]
      end
    end)
    |> List.last()
    |> Day03.Part1.solve()
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("03/01:")
IO.inspect(Day03.Part1.solve(input))

IO.puts("03/02:")
IO.inspect(Day03.Part2.solve(input))
