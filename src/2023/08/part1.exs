defmodule Day08.Part1 do
  def solve(input) do
    input = input
    |> String.split("\n", trim: true)

    instructions = List.first(input) |> String.split("", trim: true)

    rows = input
    |> Enum.drop(1)
    |> Enum.reduce(%{}, fn row, acc ->
      [label, left, right] = String.split(row, ["=", ","], trim: true)
      |> Enum.map(fn s -> String.replace(s, ["(", ")", " "], "") end)
      Map.put(acc, label, {left, right})
    end)

    parse_line(rows, instructions)
  end

  def parse_line(rows, instructions, row_label \\ "AAA", instruction_index \\ 0, steps \\ 0) do
    if row_label == "ZZZ" do
      (steps)
    else
      {label_left, label_right} = Map.get(rows, row_label)
      case Enum.at(instructions, rem(instruction_index, length(instructions))) do
        "L" -> parse_line(rows, instructions, label_left, instruction_index + 1, steps + 1)
        "R" -> parse_line(rows, instructions, label_right, instruction_index + 1, steps + 1)
      end
    end
  end
end

{:ok, input} = File.read("in.txt")

IO.puts("08/01:")
IO.puts(Day08.Part1.solve(input))
