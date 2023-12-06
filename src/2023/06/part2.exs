defmodule Day06.Part2 do
  def solve(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(fn s ->
      s
      |> String.slice(String.length("Distance:  ")..-1)
      |> String.split()
      |> Enum.join()
      |> String.to_integer()
    end)
    |> parse_record()
  end

  def parse_record([race_time, distance_record]) do
    Enum.reduce(1..race_time, 0, fn time_charged, acc ->
      if ((race_time - time_charged) * time_charged) > distance_record do
        acc + 1
      else
        acc
      end
    end)
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("06/02:")
IO.inspect(Day06.Part2.solve(input), charlists: :as_lists)
