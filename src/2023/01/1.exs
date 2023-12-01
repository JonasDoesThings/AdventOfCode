defmodule Day01.Part1 do
  def solve(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&parse_line/1)
    |> Enum.sum()
  end

  def parse_line(line) do
    line
    |> String.to_charlist()
    |> Enum.filter(&(&1 in 48..57))
    |> List.to_string()
    |> then(&(String.first(&1) <> String.last(&1)))
    |> String.to_integer()
  end
end

defmodule Day01.Part2 do
  @nums %{
    "one" => "1e",
    "two" => "2o",
    "three" => "3e",
    "four" => "4r",
    "five" => "5e",
    "six" => "6x",
    "seven" => "7n",
    "eight" => "8t",
    "nine" => "9e"
  }

  def solve(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&parse_line(&1))
    |> Enum.sum()
  end

  def parse_line(line) do
    line
    |> String.replace(Map.keys(@nums), fn k -> Map.get(@nums, k) end)
    |> String.replace(Map.keys(@nums), fn k -> Map.get(@nums, k) end)
    |> String.to_charlist()
    |> Enum.filter(&(&1 in ?0..?9))
    |> List.to_string()
    |> then(&(String.first(&1) <> String.last(&1)))
    |> String.to_integer()
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("1/1:")
IO.puts(Day01.Part1.solve(input))

IO.puts("1/2:")
IO.puts(Day01.Part2.solve(input))
