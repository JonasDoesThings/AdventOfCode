defmodule Day00.Part1 do
  def solve(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&parse_line/1)
    |> Enum.sum()
  end

  def parse_line(row) do

  end
end

defmodule Day00.Part2 do
  def solve(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&parse_line/1)
    |> Enum.sum()
  end

  def parse_line(row) do

  end
end



{:ok, input} = File.read("in.txt")

IO.puts("00/01:")
IO.inspect(Day00.Part1.solve(input))

IO.puts("00/02:")
IO.inspect(Day00.Part2.solve(input))
