defmodule Day01.Part1 do
  def solve(input) do
    {lefts, rights} = input
    |> String.split("\n", trim: true)
    |> Enum.map(fn s ->
      case String.split(s, "   ") do
        [a, b] -> {String.to_integer(a), String.to_integer(b)}
      end
    end)
    |> Enum.unzip()

    Enum.zip(Enum.sort(lefts), Enum.sort(rights))
    |> Enum.map(fn {a, b} -> abs(b-a) end)
    |> Enum.sum()
  end
end

defmodule Day01.Part2 do
  def solve(input) do
    {lefts, rights} = input
    |> String.split("\n", trim: true)
    |> Enum.map(fn s ->
      case String.split(s, "   ") do
        [a, b] -> {String.to_integer(a), String.to_integer(b)}
      end
    end)
    |> Enum.unzip()

    rightsFrequencies = Enum.frequencies(rights)
    lefts
    |> Enum.map(fn num -> num * Map.get(rightsFrequencies, num, 0) end)
    |> Enum.sum
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("1/1:")
IO.puts(Day01.Part1.solve(input))

IO.puts("1/2:")
IO.puts(Day01.Part2.solve(input))
