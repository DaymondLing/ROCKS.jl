var documenterSearchIndex = {"docs":
[{"location":"Reference/","page":"Function Reference","title":"Function Reference","text":"CurrentModule = ROCKS","category":"page"},{"location":"Reference/","page":"Function Reference","title":"Function Reference","text":"","category":"page"},{"location":"Reference/","page":"Function Reference","title":"Function Reference","text":"Modules = [ROCKS]","category":"page"},{"location":"Reference/#ROCKS.BCDiag","page":"Function Reference","title":"ROCKS.BCDiag","text":"BCDiag\n\nA structure of diagnostic properties of a Binary Classifier.\n\nFacilitates summary plots and tables.\n\n\n\n\n\n","category":"type"},{"location":"Reference/#ROCKS.accuracyplot-Tuple{BCDiag}","page":"Function Reference","title":"ROCKS.accuracyplot","text":"accuracyplot(x::BCDiag; util=[1, 0, 0, 1])\n\nUsing util values for [TP, FN, FP, TN], produce accuracy plot and its [max, argmax, argdep]. Default util values of [1, 0, 0, 1] gives the standard accuracy value of (TP+TN)/N.\n\n\n\n\n\n","category":"method"},{"location":"Reference/#ROCKS.bcdiag-Tuple{BitVector, Vector{T} where T}","page":"Function Reference","title":"ROCKS.bcdiag","text":"bcdiag(target, pred; groups = 100, rev = true, tie = 1e-6)\n\nPerform diagnostics of a binary classifier. target is a 2 level categorical variable, pred is probability of class 1. groups is the number of bins to use for plotting/printing. rev = true orders pred from high to low. tie is the tolerance of pred where values are considered tied.\n\nReturns a BCDiag struct which can be used for plotting or printing:\n\nbiasplot is calibration plot of target response rate vs. pred response rate\nksplot produces ksplot of cumulative distributions\nrocplot plots the Receiver Operating Characteristics curve\naccuracyplot plots the accuracy curve with adjustable utility\nliftcurve is the lift curve\ncumliftsurve is the cumulative lift surve\nliftable is the lift table as a DataFrame\ncumliftable is the cumulative lift table as a DataFrame\n\n\n\n\n\n","category":"method"},{"location":"Reference/#ROCKS.biasplot-Tuple{BCDiag}","page":"Function Reference","title":"ROCKS.biasplot","text":"biasplot(x::BCDiag)\n\nreturns a bias calibration plot of x - actual response vs. predicted response\n\n\n\n\n\n","category":"method"},{"location":"Reference/#ROCKS.concordance","page":"Function Reference","title":"ROCKS.concordance","text":"concordance(class::BitVector, var::Vector, tie=1e-6)\n\nConcordance calculation: class is a 2 level categorical target variable, var is a predictor, tie is a region where predictor values are considered as tied.\n\nPair-wise comparison between class 1 with class 0 values are made as follows:\n\nclass 1 value > class 0 value is Concordant\nclass 1 value ≈ class 0 value (within tie) is Tied\nclass 1 value < class 0 value is Discordant\n\nReturns:\n\nconcordant, number of concordant comparisons\ntied, number of tied comparisons\ndiscordant, number of discordant comparisons\nauroc, or C, is (Concordant + 0.5Tied) / Total comparisons; same as numeric integration of ROC curve\ngini, 2C-1, also known as Somer's D, is (Concordant - Discordant) / Total comparisons\n\nConcordance calculation is the same as numeric integration of the ROC curve, but knowledge of concordant/tied/discordant is more informative than area under curve.\n\nNote:\n\nGoodman-Kruskal Gamma is (Concordant - Discordant) / (Concordant + Discordant)\nKendall's Tau is (Concordant - Discordant) / (0.5 x Total count x (Total count - 1))\n\n\n\n\n\n","category":"function"},{"location":"Reference/#ROCKS.concordance-Tuple{BitVector, Vector{T} where T, Function}","page":"Function Reference","title":"ROCKS.concordance","text":"concordance(class::BitVector, var::Vector, tie::Function)\n\nConcordance calculation with a function to define tied region. More generally flexible when comparing, e.g., income of two groups, where the tied region is not constant but is a percentage of the income for instance.\n\n\n\n\n\n","category":"method"},{"location":"Reference/#ROCKS.cumliftable-Tuple{BCDiag}","page":"Function Reference","title":"ROCKS.cumliftable","text":"cumliftable(x::BCDiag)\n\nreturns a cumulative lift table of x as a DataFrame\n\n\n\n\n\n","category":"method"},{"location":"Reference/#ROCKS.cumliftcurve-Tuple{BCDiag}","page":"Function Reference","title":"ROCKS.cumliftcurve","text":"cumliftcurve(x::BCDiag)\n\nreturns a cumulative lift curve plot of x - cumulative actual and predicted vs. depth\n\n\n\n\n\n","category":"method"},{"location":"Reference/#ROCKS.ksplot-Tuple{BCDiag}","page":"Function Reference","title":"ROCKS.ksplot","text":"ksplot(x::BCDiag)\n\nreturns a KS plot of x - CDF1 (True Positive) and CDF0 (False Positive) versus depth\n\n\n\n\n\n","category":"method"},{"location":"Reference/#ROCKS.kstest-Tuple{BitVector, Vector{T} where T}","page":"Function Reference","title":"ROCKS.kstest","text":"kstest(class, var; rev = true)\n\nCalculate empirical 2 sample Kolmogorov-Smirnov statistic and its location. class is a 2 level categorical variable, var is the distribution to analyze.\n\nReturns:\n\nn, total number of observations\nn1, number of observations of class 1\nn0, number of observations of class 0\nbaserate, incidence rate of class 1\nks, the maximum separation between the two cumulative distributions\nksarg, the value of var at which maximum separation is achieved\nksdep, depth of ksarg in the sorted values of var\n\nrev = true counts depth from high value towards low value\n\n\n\n\n\n","category":"method"},{"location":"Reference/#ROCKS.liftable-Tuple{BCDiag}","page":"Function Reference","title":"ROCKS.liftable","text":"liftable(x::BCDiag)\n\nreturns a lift table of x as a DataFrame\n\n\n\n\n\n","category":"method"},{"location":"Reference/#ROCKS.liftcurve-Tuple{BCDiag}","page":"Function Reference","title":"ROCKS.liftcurve","text":"liftcurve(x::BCDiag)\n\nreturns a lift curve plot of x - actual and predicted versus depth\n\n\n\n\n\n","category":"method"},{"location":"Reference/#ROCKS.ranks-Tuple{Vector{T} where T}","page":"Function Reference","title":"ROCKS.ranks","text":"ranks(x; groups = 10, rank = tiedrank, rev = false)\n\nReturn a variable which bins x into groups number of bins. The rank keyword allows different ranking method; use rev = true to reverse sort so that small bin number is large value of x. Missing values are assigned to group missing.\n\nDefault values of rank = tiedrank and rev = false results in similar grouping as SAS PROC RANK groups=n tied=mean.\n\n\n\n\n\n","category":"method"},{"location":"Reference/#ROCKS.rocplot-Tuple{BCDiag}","page":"Function Reference","title":"ROCKS.rocplot","text":"rocplot(x::BCDiag)\n\nreturns a ROC plot of x - CDF1 (True Positive) vs. CDF0 (False Positive)\n\n\n\n\n\n","category":"method"},{"location":"man/binning/#Binning","page":"Binning","title":"Binning","text":"","category":"section"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"Binning is a frequent operation in Data Science which groups a continuous variable into a number of discrete bins. There are numerous ways of doing this:","category":"page"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"You have specific cut points in mind, perhaps industry norms\nYou are interested in specific quantile bins\nYou want N groups with equal density\nYou want equal width bins like a histogram\nYou want to highlight the pareto nature of a variable","category":"page"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"Let's create a random vector:","category":"page"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"using Random, Distributions\nRandom.seed!(888)\nx = rand(Normal(100, 10), 500);","category":"page"},{"location":"man/binning/#Known-cut-points","page":"Binning","title":"Known cut points","text":"","category":"section"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"The CategoricalArrays package has a cut function that creates a CategoricalArray data structure which is the binned vector:","category":"page"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"using CategoricalArrays                 # create categorical vectors\nusing FreqTables                        # package to produce frequency tables\n\ncuts = [80, 90, 100, 110, 120]          # interior cut points\nxc = cut(x, cuts, extend = true);       # must extend end points for interior cuts\ntypeof(xc)","category":"page"},{"location":"man/binning/#Is-it-ordered","page":"Binning","title":"Is it ordered","text":"","category":"section"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"isordered(xc)","category":"page"},{"location":"man/binning/#What-are-the-levels","page":"Binning","title":"What are the levels","text":"","category":"section"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"levels(xc)","category":"page"},{"location":"man/binning/#Internal-bin-number","page":"Binning","title":"Internal bin number","text":"","category":"section"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"levels(xc.refs)             # CategoricalArray uses UInt32","category":"page"},{"location":"man/binning/#Frequency-count","page":"Binning","title":"Frequency count","text":"","category":"section"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"freqtable(xc)","category":"page"},{"location":"man/binning/#Missing-values-in-the-data","page":"Binning","title":"Missing values in the data","text":"","category":"section"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"If the data contains missing values, cut will create missing levels","category":"page"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"using Missings\n\nxm = allowmissing(x)                # vector that allows missing values\nix = rand(1:length(xm), 20)\nxm[ix] .= missing\n\nxmc = cut(xm, cuts, extend = true)\nlevels(xmc)","category":"page"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"Unfortunately, levels does not indicate there is a missing level. It would be more informative if it did inform the user. The missing level does show up on the frequency tables","category":"page"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"freqtable(xmc)","category":"page"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"freqtable(xmc.refs)         # 0 is bin number for missing","category":"page"},{"location":"man/binning/#Quantile-cuts","page":"Binning","title":"Quantile cuts","text":"","category":"section"},{"location":"man/binning/#N-equal-density-groups","page":"Binning","title":"N equal density groups","text":"","category":"section"},{"location":"man/binning/#N-equal-width-groups","page":"Binning","title":"N equal width groups","text":"","category":"section"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"Histogram cuts.","category":"page"},{"location":"man/binning/#N-equal-value-groups","page":"Binning","title":"N equal value groups","text":"","category":"section"},{"location":"man/binning/","page":"Binning","title":"Binning","text":"Pareto cuts","category":"page"},{"location":"man/bcdiag/#Binary-classifier-performance-evaluation","page":"Binary Classifier","title":"Binary classifier performance evaluation","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"Whether you are building a binary classifier or need to audit one built by someone else, there are many things we'd like to know about its performance. The following sections describe functions that are designed to let you easily get at commonly used binary classifier performance diagnostic metrics.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"The functions are relatively performant and are capable of handling millions of rows of data.","category":"page"},{"location":"man/bcdiag/#kstest","page":"Binary Classifier","title":"kstest","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"The two sample Kolmogorov-Smirnov test is a statistical test of whether two empirical distributions are the same. The test is based on finding the maximum separation between the two cumulative distribution functions (CDF) and determining the p-value of the test statistic.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"For binary classifiers, the predicted probabilities of the two classes should be different, thus the interest isn't whether the probability distributions are different, rather, it is how large is the maximal separation and where does it occur.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"Let's generate some data to illustrate the idea.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"using Plots\nENV[\"GKSwstype\"] = \"nul\"            # running headless turn off GR plot display\nusing Random, Distributions\nRandom.seed!(123)\n\nn100 = rand(Normal(100, 10), 1000)\nn100a = rand(Normal(100, 10), 1000)\nn120 = rand(Normal(120, 10), 1000)\nn140 = rand(Normal(140, 10), 1000)\n\nhistogram(n100, nbins = 50, opacity= 0.3)\nhistogram!(n100a, nbins = 50, opacity= 0.3, legend = nothing)\nsavefig(\"kstest-1.svg\"); nothing # hide","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"(Image: )","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"We can use the kstest function to find the maximum separation and its location. The required input is a vector designating the two classes and another vector of the values, this is the typical data structure of model scoring on development or validation data.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"using DSUtils\n\ncls = [fill(0, length(n100)); fill(1, length(n100a))]\nvalues = [n100; n100a]\nkstest(cls, values)","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"kstest returns results in a named tuple:","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"n, total number of observations\nn1, total number of observations in class 1\nn0, total number of observations in class 0\nbaserate, n1 / n, the incidence rate of class 1\nks, the maximum separation between CDF1 and CDF0, a value between [0, 1]\nksarg, argmax, the value where maximum separation is achieved\nksdep, depth of argmax in the sorted values (default sort is from high to low)","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"ks of 0 means the distributions are indistinguishable, ks of 1 says the two distributions are complete separable. These two distributions have negligible separation since they are drawn from the same distribution.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"We now test on moderate separation:","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"histogram(n100, nbins = 50, opacity= 0.3)\nhistogram!(n120, nbins = 50, opacity= 0.3, legend = nothing)\nsavefig(\"kstest-2.svg\"); nothing    # hide","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"(Image: )","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"cls = [fill(0, length(n100)); fill(1, length(n120))]\nvalues = [n100; n120]\nkstest(cls, values)","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"There's considerable separation between the classes, and ks is larger than before.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"Let's test on widely separately data:","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"histogram(n100, nbins = 50, opacity= 0.3)\nhistogram!(n140, nbins = 50, opacity= 0.3, legend = nothing)\nsavefig(\"kstest-3.svg\"); nothing    # hide","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"(Image: )","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"cls = [fill(0, length(n100)); fill(1, length(n140))]\nvalues = [n100; n140]\nkstest(cls, values)","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"We can see that the two classes are nearly separable and ks is now quite high at 0.949. These examples illustrate how ks can serve as an indicator of the ability to separate the two classes.","category":"page"},{"location":"man/bcdiag/#auroc","page":"Binary Classifier","title":"auroc","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"A good binary classifier would have high sensitivity (able to recognize True Positive) and high specificity (able to recognize True Negatives, hence have low False Positive). A plot of the trade-off curve of True Positive Rate versus False Positive Rate at various cutoff probabilities is called the Receiver Operating Characteristics (ROC) curve. One way to quantify performance is by the area under the ROC curve, often abbreviated as AUC or C, many packages would compute AUC via numeric integration of the ROC curve. AUC is in the range [0, 1], a perfect model has AUC of 1, a random model has AUC of 0.5, and a perfectly backwards model would have AUC of -1.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"There is another interpretation of AUC which provides more intuition than simply as the area under a curve. If we make all possible pair-wise comparisons between the probabilities of class 1 with class 0, we can count the incidences of:","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"Concordant: class 1 probability > class 0 probability\nTied: class 1 probability ≈ class 0 probability\nDiscordant: class 1 probability < class 0 probability","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"Then we can compute:","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"AUC: (Concordant + 0.5 Tied) / (N1 * N0)\nGini: 2AUC - 1, or (Concordant - Discordant) / (N1 * N0)\nGoodman-Kruskal Gamma: (Concordant - Discordant) / (Concordant + Discordant), no penalty for Tied\nKendall's Tau: (Concordant - Discordant) / (0.5 * (N1+N0) * (N1+N0-1))","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"We can interpret AUC as the percentage of time class 1 probabilities is larger than class 0 probabilities (ignoring ties).","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"The mathematical proof can be found at Stack Exchange and Professor David J. Hand's article.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"cls = [fill(0, length(n100)); fill(1, length(n140))]\nvalues = [n100; n140]\nauroc(cls, values)","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"auroc returns results in a named tuple:","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"conc, number of concordant comparisons\ntied, number of tied comparisons\ndisc, number of discordant comparisons\nauc, area under ROC curve, or just area under curve\ngini, 2auc - 1","category":"page"},{"location":"man/bcdiag/#bcdiag","page":"Binary Classifier","title":"bcdiag","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"While kstest and auroc provide diagnostic measures for comparing model performance, when there is a model of interest, it is likely that we need to produce many graphs and table to understand and document its performance, bcdiag allows us to do this easily.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"using Random\nusing GLM\nusing DSUtils\n\nfunction logitgen(intercept::Real, slope::Real, len::Int; seed = 888)\n    Random.seed!(seed)\n    x = 10 .* rand(len)                     # random uniform [0, 10)\n    # sort!(x)                                # x ascending\n    logit = @. intercept + slope * x        # logit(prob) = ln(p / (1 + p)) = linear equation\n    prob = @. 1. / (1. + exp(-logit))       # probability\n    y = rand(len) .<= prob\n    y, x\nend\n\nm = DataFrame(logitgen(-3, 0.6, 100_000), (:target, :x))\nm_logistic = glm(@formula(target ~ x), m, Binomial(), LogitLink())\nm.pred = predict(m_logistic)\n\nkstest(m.target, m.pred)","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"auroc(m.target, m.pred)","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"Running bcdiag prints a quick summary:","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"mdiag = bcdiag(m.target, m.pred)","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"The output structure allows us to create the following plots and tables to understand:","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"the ability of the model to separate the two classes\nthe accuracy of the probability point estimates\nhow to set cutoff for maximum accuracy\nperformance of the model at varying cutoff depth","category":"page"},{"location":"man/bcdiag/#ksplot","page":"Binary Classifier","title":"ksplot","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"ksplot plots the cumulative distribution of class 1 (true positive rate) and class 0 (false positive rate) versus depth.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"ksplot(mdiag)\nsavefig(\"bcd-ksplot.svg\"); nothing # hide","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"It shows where the maximum separation of the two distributions occur.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"(Image: )","category":"page"},{"location":"man/bcdiag/#rocplot","page":"Binary Classifier","title":"rocplot","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"rocplot plots the true positive rate vs. false positive rate (depth is implicit).","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"rocplot(mdiag)\nsavefig(\"bcd-rocplot.svg\"); nothing # hide","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"A perfect model has auc of 1, a random model has auc of 0.5.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"(Image: )","category":"page"},{"location":"man/bcdiag/#biasplot","page":"Binary Classifier","title":"biasplot","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"Both ksplot and rocplot rely on the ability of the model to rank order the observations, the score value itself doesn't matter. For example, if you took the score and perform any monotonic transform, ks and auc wouldn't change. There are occasions where the score value does matter, where the probabilities need to be accurate, for example, in expected return calculations. Thus, we need to understand whether the probabilities are accurate, biasplot does this by plotting the observed response rate versus predicted response rate to look for systemic bias. This is also called the calibration graph.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"biasplot(mdiag)\nsavefig(\"bcd-biasplot.svg\"); nothing # hide","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"(Image: )","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"An unbiased model would lie on the diagnonal, systemic shift off the diagonal represents over or under estimate of the true probability.","category":"page"},{"location":"man/bcdiag/#accuracyplot","page":"Binary Classifier","title":"accuracyplot","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"People often refer to (TP + TN) / N as accuracy of the model, that is, the ability to correctly identify correct cases. It is used to compare model performance as well - model with higher accuracy is a better model. For a probability based classifier, a cutoff is required to turn probability to predicted class. So, what is the cutoff value to use to achieve maximum accuracy?","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"There are many approaches to setting the best cutoff, one way is to assign utility values to the four outcomes of [TP, FP, FN, TN] and maximize the sum across different cutoff's. Accuracy measure uses the utility values of [1, 0, 0, 1] giving TP + TN. You can assign negative penalty terms for misclassification as well.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"Note that this is different from kstest - maximum separation on cumulative distribution (normalized to 100%) does not account for class size difference, e.g., class 1 may be only 2% of the cases.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"accuracyplot(mdiag)\nsavefig(\"bcd-accuracyplot.svg\"); nothing # hide","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"(Image: )","category":"page"},{"location":"man/bcdiag/#liftcurve","page":"Binary Classifier","title":"liftcurve","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"liftcurve plots the actual response and predicted response versus depth, with baserate as 1.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"liftcurve(mdiag)\nsavefig(\"bcd-liftcurve.svg\"); nothing # hide","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"We can easily see where the model is performing better than average, approximately the same as average, or below average.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"(Image: )","category":"page"},{"location":"man/bcdiag/#cumliftcurve","page":"Binary Classifier","title":"cumliftcurve","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"cumliftcurve is similar to liftcurve, the difference is it is a plot of cumulative response rate from the top of the model.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"cumliftcurve(mdiag)\nsavefig(\"bcd-cumliftcurve.svg\"); nothing # hide","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"(Image: )","category":"page"},{"location":"man/bcdiag/#liftable","page":"Binary Classifier","title":"liftable","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"liftable is the table from which liftcurve is plotted.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"liftable(mdiag)","category":"page"},{"location":"man/bcdiag/#cumliftable","page":"Binary Classifier","title":"cumliftable","text":"","category":"section"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"cumliftable is the cumulative version of liftable.","category":"page"},{"location":"man/bcdiag/","page":"Binary Classifier","title":"Binary Classifier","text":"cumliftable(mdiag)","category":"page"},{"location":"#ROCKS.jl","page":"Home","title":"ROCKS.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Two of the commonly used metrics to evaluate the performance of a binary classifier are:","category":"page"},{"location":"","page":"Home","title":"Home","text":"C-statistic (concordance statistic) or Area Under Curve or just ROC ","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Receiver Operating Characteristic)","category":"page"},{"location":"","page":"Home","title":"Home","text":"<img src=\"../assets/rocplot.png\"/>","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: ROCPlot)","category":"page"},{"location":"","page":"Home","title":"Home","text":"KS-Statistic (Kolmogorov-Smirnov 2 sample CDF max separation)","category":"page"},{"location":"","page":"Home","title":"Home","text":"<img src=\"../assets/ksplot.png\"/>","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: KSPlot)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package makes it easy to calculate ROC and KS, and produce graphs and tables for documentation purposes.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package is installable via its URL:","category":"page"},{"location":"","page":"Home","title":"Home","text":"] add https://github.com/DaymondLing/ROCKS.jl","category":"page"}]
}
