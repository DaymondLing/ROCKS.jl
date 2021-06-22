using ROCKS
using Test

@testset "ROC, KS" begin
    @testset "ranks binning" begin
        x = [1, 1, 1, 2, 2, 2, 2, 2, 3, 3]
        xm = [1, 1, missing, 2, 2, 2, 3, 3, 3, 3]
        @test ranks(x) == [1, 1, 1, 5, 5, 5, 5, 5, 8, 8]
        @test ranks(x, rev=true) == [8, 8, 8, 4, 4, 4, 4, 4, 1, 1]
        @test ranks(x, rank=StatsBase.ordinalrank) == [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        @test ranks(x, rank=StatsBase.competerank) == [0, 0, 0, 3, 3, 3, 3, 3, 8, 8]
        @test ranks(x, rank=StatsBase.denserank) == [0, 0, 0, 1, 1, 1, 1, 1, 2, 2]
        @test isequal(ranks(xm), [1, 1, missing, 4, 4, 4, 7, 7, 7, 7])
    end

    @testset "ks roc" begin
        t = [0, 0, 0, 1, 1, 1]
        x = [1, 1, 1, 2, 2, 2]

        @test kstest(t, x) ==
              (n = 6, n1 = 3, n0 = 3, baserate = 0.5, ks = 1.0, ksarg = 2, ksdep = 0.5)
        @test roc(t, x) == (conc = 9, tied = 0, disc = 0, auc = 1.0, gini = 1.0)
    end
end
