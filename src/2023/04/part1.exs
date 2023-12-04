defmodule Day04.Part1 do
  def solve(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&parse_line/1)
    |> Enum.sum()
  end

  def parse_line(row) do
    [winning_numbers, card_numbers] =
      row
      |> String.split(":")
      |> List.last()
      |> String.split("|", trim: true)

    winning_numbers = String.split(winning_numbers)

    String.split(card_numbers)
    |> Enum.filter(fn x -> Enum.member?(winning_numbers, x) end)
    |> length()
    |> then(&if &1 < 1, do: 0, else: :math.pow(2, &1 - 1))
    |> round()
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("4/1:")
IO.puts(Day04.Part1.solve(input))
